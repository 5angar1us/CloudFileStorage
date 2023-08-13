import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { FileFormComponent } from './components/file-form/file-form.component';
import { FileNavigationComponent } from './components/file-navigation/file-navigation.component';

const routes: Routes = [
  {path: 'demo', component: DemoComponent},
  {path: 'file-form', component: FileFormComponent},
  {path: 'file-navigation', component: FileNavigationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
