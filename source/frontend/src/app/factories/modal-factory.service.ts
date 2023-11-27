import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MoveModalComponent } from '../components/move-modal/move-modal.component';
import { RenameModalComponent } from '../components/rename-modal/rename-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalFactory {

    constructor(private modalService: NgbModal) { }

    public createMoveModal(path: string) {
        const { fileName: fileName, folderPath: newFolderPath } = this.splitFilePathOnParts(path);

        const modalRef = this.modalService.open(MoveModalComponent);
        modalRef.componentInstance.currentPath = path;
        modalRef.componentInstance.fileName = fileName
        modalRef.componentInstance.newFolderPath = newFolderPath

        return modalRef;
    }

    public createRenameModal(path: string) {
        const { fileName: fileName, folderPath: folderPath } = this.splitFilePathOnParts(path);

        const modalRef = this.modalService.open(RenameModalComponent);
        modalRef.componentInstance.currentPath = path;
        modalRef.componentInstance.newName = fileName
        modalRef.componentInstance.folderPath = folderPath

        return modalRef;
    }

    private splitFilePathOnParts(path: string) {
        var splitedPath = path.split("/");
        var lastIndex = splitedPath.length - 1;

        var fileName = splitedPath[lastIndex];
        var folderPath = splitedPath.slice(0, lastIndex).join("/");

        return { fileName: fileName, folderPath: folderPath }
    }

}
