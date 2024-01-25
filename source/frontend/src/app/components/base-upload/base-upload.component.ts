import { Component } from '@angular/core';
import { FileItem } from 'src/app/Models/FileItem';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { StringBuilder } from 'src/app/utils/String-builder';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-base-upload',
  templateUrl: './base-upload.component.html',
  styleUrls: ['./base-upload.component.scss']
})
export class BaseUploadComponent {
  public files: FileItem[];
  private maxSizeInMB = 5;
  private maxSizeInKiloBytes = this.maxSizeInMB * 1024;
  private minSizeInBytes = 0;

  constructor(private uploadFileService: UploadFileService, private alertService: AlertService) {
    this.files = []
  }

  public onFileChange(files: FileList | null) {
    if (files == null) return;

    this.files = Array.from(files)
      .map(file => {
        const fullPath = this.extractFullFilePath(file);

        let item: FileItem = {
          name: file.name,
          path: fullPath,
          sizebytes: file.size,
          file: file
        }
        return item
      })
  }

  public uploadFiles() {
    if( this.files.length <= 0) return

    if(this.TryValidate(this.files) == false) return
    
    let files = this.files.map(fileItem =>fileItem.file);
    this.uploadFileService.uploadFiles(files)
  }

  public TryValidate(files: FileItem[]): boolean{
    let validatedFileItem = files.map(file => {
      
      let validatedFileItem : ValidatedFileItem ={
        fileItem : file,
        isValid : true
      }
      return validatedFileItem;
    });

    validatedFileItem = validatedFileItem.map(file=>{

      file.isValid = this.validateForLargeSize(file) 
      && this.validateForSmallerSize(file);
      
      return file;
    });

    let isAllValid = validatedFileItem.every(file => file.isValid)
    if(isAllValid) return true;

    const stringBulder = new StringBuilder();
    stringBulder.appendLine(`The file size must not exceed the limit of ${this.maxSizeInKiloBytes} KiloBytes (${this.maxSizeInMB} mb)`);
    stringBulder.appendLine(`The file size must be greater than ${this.minSizeInBytes} Bytes`);
    stringBulder.appendLine("");
    stringBulder.appendLine(`Problem with file(s):`);

    const invalidFiles = validatedFileItem.filter(file =>file.isValid == false);
    for (let file of invalidFiles) {
      stringBulder.appendLine(`- ${file.fileItem.name}`)
    }

    this.alertService.error(stringBulder.toString());
    return false
  }

  public deleteFile(path: string) {
    this.files = this.files.filter(file => file.path != path)
  }

  private extractFullFilePath(file: File) {
    const webkitRelativePath: string = this.extractWebkitRelativePath(file);

    return webkitRelativePath;
  }

  private extractWebkitRelativePath(file: File) {
    return file['webkitRelativePath']
  }

  private validateForLargeSize(file: ValidatedFileItem){
    let sizeInKiloBytes = parseInt((file.fileItem.sizebytes / 1024).toFixed(4));
    return sizeInKiloBytes <= this.maxSizeInKiloBytes;
  }

  private validateForSmallerSize(file: ValidatedFileItem){
    return file.fileItem.sizebytes > this.minSizeInBytes;
  }

}

export interface ValidatedFileItem {
  fileItem: FileItem
  isValid: boolean
}
