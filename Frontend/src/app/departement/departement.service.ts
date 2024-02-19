import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http: HttpClient) { }

  BASE_URL = "http://localhost:3000";

  getDepartements(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/departement/`);
  }

  saveDepartement(departement: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/departement/`, departement);
  }

  supprimerDepartement(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/departement/${id}`);
  }

  modifierDepartement(id: string, departement: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/departement/${id}`, departement);
  }
}
