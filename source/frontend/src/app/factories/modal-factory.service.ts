import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoveModalComponent } from '../components/move-modal/move-modal.component';
import { RenameModalComponent } from '../components/rename-modal/rename-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalFactory {

  constructor(private modalService: NgbModal) {}

    public createMoveModal(path: string){
        var splitedPath = path.split("/");
        var lastIndex = splitedPath.length -1;

        var fileName = splitedPath[lastIndex];
        var newFolderPath =splitedPath.slice(0, lastIndex).join("/");
       
        const modalRef = this.modalService.open(MoveModalComponent);
		modalRef.componentInstance.currentPath = path;
        modalRef.componentInstance.fileName = fileName
        modalRef.componentInstance.newFolderPath = newFolderPath
        
        return modalRef;
    }

    public createRenameModal(path : string){
        

        const modalRef = this.modalService.open(RenameModalComponent);
		modalRef.componentInstance.currentPath = path;
        

        return modalRef;
    }
}
