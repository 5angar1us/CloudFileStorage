import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { FileNavigationComponent } from './components/file-navigation/file-navigation.component';
import { authGuard } from './guards/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { SystemComponent } from './components/system/system.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { UploadFolderComponent } from './components/upload-folder/upload-folder.component';

const routes: Routes = [
  {path: 'demo', component: DemoComponent},
  {path: 'upload/files', component: UploadFilesComponent, canActivate: [authGuard]},
  {path: 'upload/folders', component: UploadFolderComponent, canActivate: [authGuard]},
  {path: 'file-navigation', component: FileNavigationComponent, canActivate: [authGuard]},
  {path: 'search', component: SearchComponent, canActivate: [authGuard]},
  {path: 'system', component: SystemComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
