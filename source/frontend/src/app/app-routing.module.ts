import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { FileFormComponent } from './components/file-form/file-form.component';

const routes: Routes = [
  {path: 'demo', component: DemoComponent},
  {path: 'file-form', component: FileFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
