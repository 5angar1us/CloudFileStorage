import { Component, EventEmitter, Input, Output } from '@angular/core';
import { S3Object } from 'src/app/Models/S3Object';
import { faFolder,  faFile } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RenameModalComponent } from '../rename-modal/rename-modal.component';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.scss']
})
export class FileTableComponent {
  @Input() public s3Objects : S3Object[] = []
  @Output() onChanged = new EventEmitter<void>();
  faFolder = faFolder;
  faFile = faFile;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

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
  renameFile(path : string){
    const modalRef = this.modalService.open(RenameModalComponent);
		modalRef.componentInstance.currentPath = path;

    modalRef.result.then(() => {
      this.onChanged.emit();
    },
    (error) => {
      console.log(error)
    });

  }
}
