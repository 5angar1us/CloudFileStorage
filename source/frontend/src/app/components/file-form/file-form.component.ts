import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent{
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
