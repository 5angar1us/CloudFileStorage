import { HttpClient } from '@angular/common/http';
import { parseHostBindings } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { S3Object } from '../../Models/S3Object';
import { NavigationItem } from 'src/app/Models/NavigationItem';
import { StringExtentions } from 'src/app/utils/string-extentions';

@Component({
  selector: 'app-file-navigation',
  templateUrl: './file-navigation.component.html',
  styleUrls: ['./file-navigation.component.scss']
})
export class FileNavigationComponent {
  private path : string = "";
  private readonly emptyPath : string = "\"\""

  s3Objects : S3Object[] = []

  navigationItems: NavigationItem [] = []

  constructor(private http: HttpClient, private route: ActivatedRoute){

    this.route.queryParams.subscribe((params) => {
      this.path = params['path'] ?? this.emptyPath;

      this.navigationItems = this.createNavigationItems(this.path);

      this.loadData();
    });    
  }

  S3ObjectsChanged(){
    this.loadData();
}

  private loadData(){
    this.http.get<S3Object[]>('http://localhost:5050/api/v1/File/SearchInFolders', { params: { query: this.path}}).subscribe({
        next : (respone) => {
          console.log(respone)
          this.s3Objects = respone;
        },
        error: (e) => console.error(e)
        });
  }

  private createNavigationItems(path: string) : NavigationItem[]{
    let processedPath = path.replace("\"", "").replace("\"", "").trim();

    if(StringExtentions.isEmpty(processedPath)) return [];

    let pathParts : string[]  = processedPath.split("\/");

    let navigationItems: NavigationItem[] = []

    let accumulator = "";
    for(let i = 0; i < pathParts.length; i++){
      let part = pathParts[i];

      accumulator = accumulator.concat(part,"/");

      navigationItems.push({name: part, link: accumulator})
    }

    return navigationItems;
  }

}

