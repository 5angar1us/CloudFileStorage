import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent{
  selectedFiles: File[];

  constructor(private http: HttpClient) {
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
        console.log('Успешно загружено');
      },
      (error) => {
        console.log('Ошибка при загрузке');
      }
    );
  }
}
