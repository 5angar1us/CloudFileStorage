import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestData } from '../request/request.component';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { routes } from 'src/app/services/routes';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  public environment = environment;
  public isAuthenticated: boolean;
  public username: string | undefined;
  
  public getArticleData: RequestData = {id: ''};
  public addArticleData: RequestData = {id: '', description: ''};
  public removeArticleData: RequestData = {id: ''};

  public getArticles: () => Observable<any[]>;
  public getArticle: (article: RequestData) => Observable<any>;
  public addArticle: (article: RequestData) => Observable<Object>;
  public removeArticle: (article: RequestData) => Observable<Object>;
  public getApplicationName: () => Observable<string>;
  public getCurrentUser: () => Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService,
  ) {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.username = this.authenticationService.username;

    this.getArticles = () => this.httpClient.get<any[]>(routes.article.getArticles);
    this.getArticle = (article) => this.httpClient.get<any>(`${routes.article.getArticle}?${new HttpParams().append('id', article['id'])}`);
    this.addArticle = (article) => this.httpClient.post(routes.article.addArticle, article,);
    this.removeArticle = (article) => this.httpClient.delete(`${routes.article.removeArticle}?${new HttpParams().append('id', article['id'])}`);
    this.getApplicationName = () => this.httpClient.get(routes.information.getApplicationName, {responseType: 'text'});
    this.getCurrentUser = () => this.httpClient.get(routes.user.getCurrentUser);
  }
}
