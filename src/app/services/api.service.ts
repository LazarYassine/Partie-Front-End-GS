import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users';
import { Categorie } from 'app/models/categorie';
import { Collaborateur } from 'app/models/collaborateur';




@Injectable({
  providedIn: 'root'
})

export class ApiService {

  host = 'http://localhost:8099';

  constructor(private http: HttpClient) { }

  //User Service Start

  public getUsers() {
    return this.http.get<Users[]>(this.host + '/fetchUsers');
  }

  public removeUser(user) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: user,
    };

    return this.http
      .delete(this.host + '/deleteUser', options);
  }

  public ajouterUser(user) {
    return this.http.post<Users>(this.host + '/ajouterUser', user);
  }

  public ModifyUser(myUser) {
  
  const requestBody = JSON.stringify(myUser);
  
  return this.http.put(this.host + '/modifierUser', requestBody, { headers: { 'Content-Type': 'application/json' } });
  //return this.http.put(this.host + '/modifierUser', myUser);
  }

  //User Service End

  //Category Service Start

  public getCategories() {
    return this.http.get<Categorie[]>(this.host + '/fetchCategorie');
  }

  public ajouterCategory(categorie) {
    return this.http.post<Users>(this.host + '/AjouterCategorie', categorie);
  }

  public removeCategory(categorie) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: categorie,
    };

    return this.http
      .delete(this.host + '/SupprimerCategorie', options);
  }

  public ModifyCategory(myCategory) {

    const requestBody = JSON.stringify(myCategory);

    return this.http.put(this.host + '/ModifierCategorie', requestBody, { headers: { 'Content-Type': 'application/json' } });
    
    
  }

  //Category Service End

  //Collaborators Service Start

  public getCollaborateurs() {
    return this.http.get<Collaborateur[]>(this.host + '/fetchCollaborateur');
  }

  public ajouterCollaborateur(collaborateur) {
    return this.http.post<Users>(this.host + '/AjouterCollaborateur', collaborateur);
  }

  public removecollaborateur(collaborateur) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: collaborateur,
    };

    return this.http
      .delete(this.host + '/SupprimerCollaborateur', options);
  }

  public ModifyCollaborateur(myCollaborateur) {

    const requestBody = JSON.stringify(myCollaborateur);

    return this.http.put(this.host + '/ModifierCollaborateur', requestBody, { headers: { 'Content-Type': 'application/json' } });
    
    
  }


  //Collaborators Service End



}
