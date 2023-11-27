import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-move-modal',
  templateUrl: './move-modal.component.html',
  styleUrls: ['./move-modal.component.scss']
})
export class MoveModalComponent {
  @Input()
  currentPath!: string;

  @Input()
  newFolderPath!: string;

  @Input()
  fileName!: string;

  constructor(public modal: NgbActiveModal, private http: HttpClient) { }

  rename(form: NgForm) {

    var fullNewPath =  this.newFolderPath + "/" + this.fileName
    this.http.patch('http://localhost:5050/api/v1/File/FilePatch', { path:this.currentPath, newPath: fullNewPath } )
      .subscribe({
        next: (respone) => {
          console.log(respone);
          this.modal.close();
        },
        error: (e) => console.log(e)
      });
  }
}
