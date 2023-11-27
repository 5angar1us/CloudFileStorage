import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rename-modal',
  templateUrl: './rename-modal.component.html',
  styleUrls: ['./rename-modal.component.scss']
})
export class RenameModalComponent {
  @Input()
  currentPath!: string;

  @Input()
  newName!: string;

  @Input()
  folderPath!: string;

  constructor(public modal: NgbActiveModal, private http: HttpClient) { }

  rename(form: NgForm) {
    var newPath = this.folderPath + "/" + this.newName;

    this.http.patch('http://localhost:5050/api/v1/File/FilePatch', { path:this.currentPath, newPath: newPath } )
      .subscribe({
        next: (respone) => {
          console.log(respone);
          this.modal.close();
        },
        error: (e) => console.log(e)
      });

  }
}
