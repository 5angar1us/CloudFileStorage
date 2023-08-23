import { Component, Input } from '@angular/core';
import { S3Object } from 'src/app/Models/S3Object';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.scss']
})
export class FileTableComponent {
  @Input() public s3Objects : S3Object[] = []
}
