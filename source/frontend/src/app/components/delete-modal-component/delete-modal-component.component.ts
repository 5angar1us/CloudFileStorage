import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal-component',
  templateUrl: './delete-modal-component.component.html',
  styleUrls: ['./delete-modal-component.component.scss']
})
export class DeleteModalComponentComponent {
  
  @Input()
  currentPath!: string;

  @Input()
  fileName!: string;

  constructor(public modal: NgbActiveModal, private http: HttpClient) {}
   
  deleteFile() {

    this.http.delete('http://localhost:5050/api/v1/File/FileDelete', { body: {path: this.currentPath}} )
      .subscribe({
        next: (respone) => {
          console.log(respone);
          this.modal.close();
        },
        error: (e) => console.log(e)
      });
  }
}
