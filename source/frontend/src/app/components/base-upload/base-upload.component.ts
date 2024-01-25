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
  files: FileItem[];
  maxSizeInMB = 5;
  maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;

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
    const isAllValid  = files.every(file => this.validateNumber(file));
    if(isAllValid) return true;

    const stringBulder = new StringBuilder();
    stringBulder.append(`File(s) larger than allowed size = ${this.maxSizeInBytes} bytes (${this.maxSizeInMB} mb):`);

    const invalidFiles = files.filter(file => this.validateNumber(file) == false);
    for (let file of invalidFiles) {
      stringBulder.append(`- ${file.name} with size(bytes) ${file.sizebytes}`)
    }

    this.alertService.error(stringBulder.toString());
    return false
  }

  public deleteFile(path: string) {
    this.files = this.files.filter(file => file.path != path)
  }

  private extractFullFilePath(file: File) {
    const webkitRelativePath: string = this.extractWebkitRelativePath(file);
    const currentpath = webkitRelativePath.split(" ").join("/");

    return currentpath;
  }

  extractWebkitRelativePath(file: File) {
    return file['webkitRelativePath']
  }

  validateNumber(file: FileItem){
    return parseInt((file.sizebytes / 1024).toFixed(4)) > this.maxSizeInBytes || false;
  }
}
