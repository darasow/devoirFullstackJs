import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http:HttpClient) { }

  BASE_URL = "http://localhost:3000";

  getDepartement():Observable<any>{
    return this.http.get(`${this.BASE_URL}/departement/`)
  }

  getEtudiants():Observable<any>{
    return this.http.get(`${this.BASE_URL}/etudiant/`)
  }

  saveEtudiant(value:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/etudiant/`,value)
  }

  supprimerEtudiant(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/etudiant/${id}`);
  }

  modifierEtudiant(id: string, etudiant: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/etudiant/${id}`, etudiant);
  }
  
  
}
