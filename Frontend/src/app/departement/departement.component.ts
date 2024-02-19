
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from './departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent {
  title = 'COURS';

  departements: any;
  myForm: FormGroup;
  isCreationMode: boolean = true; // Variable pour indiquer si le formulaire est en mode création ou modification
  departementId: string | null = null; // Variable pour stocker l'ID du département à modifier

  constructor(private service: DepartementService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.getDepartements();
  }

  getDepartements() {
    this.service.getDepartements().subscribe({
      next: (response) => {
        this.departements = response;
      },
      error: (error) => console.log(error)
    });
  }

  resetData() {
    this.myForm.reset();
    this.getDepartements();
  }

  enregistrer() {
    if (this.myForm.valid) {
      if (this.isCreationMode) {
        this.service.saveDepartement(this.myForm.value).subscribe({
          next: (response) => {
            this.resetData();
          },
          error: (error) => console.error(error)
        });
      } else {
        if (this.departementId) {
          // Appel de la méthode pour modifier le département
          this.service.modifierDepartement(this.departementId, this.myForm.value).subscribe({
            next: (response) => {
              this.resetData();
            },
            error: (error) => console.error(error)
          });
          this.isCreationMode = true;
          this.departementId = null;
        } else {
          console.error('ID du département manquant');
        }
      }
    }
  }

  modifierDepartement(departement: any) {
    this.isCreationMode = false;
    this.departementId = departement._id; // Stocker l'ID du département
    this.myForm.patchValue({
      name: departement.name
    });
  }

  supprimerDepartement(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce département?")) {
      this.service.supprimerDepartement(id).subscribe({
        next: (response) => {
          this.getDepartements();
        },
        error: (error: any) => console.error(error)
      });
    }
  }
}

