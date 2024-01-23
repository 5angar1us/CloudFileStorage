import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent {
  selectedFiles: File[];

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.selectedFiles = []
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    const formData = new FormData();

    for (let file of this.selectedFiles) {
      formData.append('files', file);
    }

    this.http.post('http://localhost:5050/api/v1/File/FileSet', formData).subscribe(
      (response) => {
        this.alertService.success('Файл(ы) успешно загружен(ы)')
      },
      (error) => {
        this.alertService.error(error.error);
      }
    );
  }
}
