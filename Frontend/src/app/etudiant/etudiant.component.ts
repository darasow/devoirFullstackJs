import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from './etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent {
  title = 'COURS';

  departements: any;
  etudiants: any;
  myForm: FormGroup;
  isCreationMode: boolean = true; // Variable pour indiquer si le formulaire est en mode création ou modification
  etudiantId: string | null = null; // Variable pour stocker l'ID de l'étudiant à modifier

  constructor(private service: EtudiantService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      matricule: ['', Validators.required],
      departement: ['', Validators.required],
    });

    this.getDepartements();
    this.getEtudiants();
  }

  getDepartements() {
    this.service.getDepartement().subscribe({
      next: (response) => {
        console.log(response);
        this.departements = response;
      },
      error: (error) => console.log(error)
    });
  }

  getEtudiants() {
    this.service.getEtudiants().subscribe({
      next: (response) => {
        this.etudiants = response;
      },
      error: (error) => console.log(error)
    });
  }
    resetData()
    {
      this.myForm.reset();
      this.getDepartements();
      this.getEtudiants();
    }
  enregistrer() {
    if (this.myForm.valid) {
      if (this.isCreationMode) {
        this.service.saveEtudiant(this.myForm.value).subscribe({
          next: (response) => {
            this.resetData()
          },
          error: (error) => console.error(error)
        });
      } else {
        if (this.etudiantId) {
          // Appel de la méthode pour modifier l'étudiant
          this.service.modifierEtudiant(this.etudiantId, this.myForm.value).subscribe({
            next: (response) => {
            this.resetData()
            },
            error: (error) => console.error(error)
            
          });
            this.isCreationMode = true;
            this.etudiantId = null;
        } else {
          console.error('ID de l\'étudiant manquant');
        }     
             
      }
    }
  }

  modifierEtudiant(etudiant: any) {
    this.isCreationMode = false;
    this.etudiantId = etudiant._id; // Stocker l'ID de l'étudiant
    this.myForm.patchValue({
      firstname: etudiant.firstname,
      lastname: etudiant.lastname,
      matricule: etudiant.matricule,
      departement: etudiant.departement._id
    });
  }

  supprimerEtudiant(id: string) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet étudiant?")) {
      this.service.supprimerEtudiant(id).subscribe({
        next: (response) => {
          this.getEtudiants();
        },
        error: (error: any) => console.error(error)
      });
    }
  }
  
  


}
