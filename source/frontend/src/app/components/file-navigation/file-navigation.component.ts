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
export class FileNavigationComponent implements OnInit, OnDestroy {
  private path : string = "";
  private sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute){

    this.route.queryParams.subscribe((params) => {
      this.path = params['path'] ?? "\"\"";

      console.log(`path ${this.path}`)
      this.http.get('http://localhost:5050/api/v1/File/Search', { params: { query: this.path}}).subscribe({
        next : (respone) => console.log(respone),
        error: (e) => console.error(e)
    });
    });    
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigationItems: NavigationItem [] = 
  [
    { name: 'eve-files', link : 'eve-files'},
    { name: 'folder1', link: "folder1"},
    {name: 'folder2', link: 'folder1/folder2'}
  ]
}

interface NavigationItem{
  name: string,
  link: string
}