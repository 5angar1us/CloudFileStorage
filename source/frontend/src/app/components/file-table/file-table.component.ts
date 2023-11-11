import { Component, Input } from '@angular/core';
import { S3Object } from 'src/app/Models/S3Object';
import { faFolder,  faFile } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.scss']
})
export class FileTableComponent {
  @Input() public s3Objects : S3Object[] = []
  faFolder = faFolder;
  faFile = faFile;

  constructor(private http: HttpClient) {}

  donloadFile(path : string, fileName : string){
    this.http.get('http://localhost:5050/api/v1/File/FileGet',{ observe:'response', responseType: 'blob' , params: { path: path}}).subscribe({
      next : (respone) => {
        console.log(respone);

        let blob: Blob = respone.body as Blob;

        let a = document.createElement('a');
        a.download = fileName
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (e) => console.error(e)
      });
  }
}
