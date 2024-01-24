import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../components/_alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  uploadFiles(files: File[]){
    const formData = new FormData();

    for (let file of files) {
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
