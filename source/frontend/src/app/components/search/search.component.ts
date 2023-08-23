import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { S3Object } from 'src/app/Models/S3Object';
import { StringExtentions } from 'src/app/utils/string-extentions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public fileName: string = "";

  private readonly emptyPath : string = "\"\""

  public s3Objects : S3Object[] = []

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      let fileName = params['path'] ?? this.emptyPath;

      this.http.get<S3Object[]>('http://localhost:5050/api/v1/File/Search', { params: { query: fileName}}).subscribe({
        next : (respone) => {
          console.log(respone)
          this.s3Objects = respone;
        },
        error: (e) => console.error(e)
        });
      
    });    
  }
  onSubmit() {
    this.router.navigateByUrl('/search?query=' + this.fileName)
 }
}
