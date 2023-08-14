import { HttpClient } from '@angular/common/http';
import { parseHostBindings } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-file-navigation',
  templateUrl: './file-navigation.component.html',
  styleUrls: ['./file-navigation.component.scss']
})
export class FileNavigationComponent {
  private path : string = "";
  private readonly emptyPath : string = "\"\""


  constructor(private http: HttpClient, private route: ActivatedRoute){

    this.route.queryParams.subscribe((params) => {
      this.path = params['path'] ?? this.emptyPath;

      this.navigationItems = this.createNavigationItems(this.path);

      this.http.get<S3Object[]>('http://localhost:5050/api/v1/File/Search', { params: { query: this.path}}).subscribe({
        next : (respone) => {
          console.log(respone)
          this.s3Objects = respone;
        },
        error: (e) => console.error(e)
        });
    });    
  }


  private createNavigationItems(path: string) : NavigationItem[]{
    let processedPath = path.replace("\"", "").replace("\"", "").trim();

    if(this.isStringEmpty(processedPath)) return [];

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

  private isStringEmpty(path: string) : boolean{
    return typeof path === 'string' && path.trim().length === 0;
  }

  s3Objects : S3Object[] = []

  navigationItems: NavigationItem [] = []
}

interface S3Object {
  datetime: string,
  isDir: boolean,
  path: string,
  size: number
}

interface NavigationItem{
  name: string,
  link: string
}