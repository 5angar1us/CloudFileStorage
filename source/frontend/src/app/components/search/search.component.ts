import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { S3Object } from 'src/app/Models/S3Object';
import { StringExtentions } from 'src/app/utils/string-extentions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public fileName: string = "";

  public s3Objects : S3Object[] = []

  constructor(private http: HttpClient) {
  
  }

  seachFile(){
    console.log("searchFile start")

    if(StringExtentions.isStringEmpty(this.fileName)== false){
      this.http.get<S3Object[]>('http://localhost:5050/api/v1/File/Search', { params: { query: this.fileName}}).subscribe({
        next : (respone) => {
          console.log(respone)
          this.s3Objects = respone;
        },
        error: (e) => console.error(e)
        });
    }
    
    
  }
}
