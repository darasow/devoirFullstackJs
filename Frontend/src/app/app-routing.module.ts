import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartementComponent } from './departement/departement.component';
import { EtudiantComponent } from './etudiant/etudiant.component';

const routes: Routes = [
  { path: 'departements', component: DepartementComponent},
  { path: '', component: EtudiantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
