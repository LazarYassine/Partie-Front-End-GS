import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import {Users} from '../models/users';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  

  EditForm: boolean = false;

    myUser: Users = {
        login: '',
        password: ''
    }
   users: Users[] = [];
   

  constructor( private apiService: ApiService ) { }

  res: boolean = false;
    ConfirmDelete(user) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, annulez !',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.removeUser(user)
        .subscribe( user => 
          this.FetchUsers()  );
        swalWithBootstrapButtons.fire(
          'Supprimé !',
          "L'utilisateur a été supprimé.",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.res = false;
        swalWithBootstrapButtons.fire(
          'Annulé',
          "L'utilisateur n'est pas supprimé :)",
          'error'
        )
      }
    })
    return this.res;
  }

  ConfirmEdit(user) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous allez modifier les informations de cet utilisateur",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, éditez-le !',
      cancelButtonText: 'Non, annulez !',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.ModifyUser(this.myUser)
        .subscribe(user => this.FetchUsers())
        this.EditForm = false;
        this.resetUserForm();
        swalWithBootstrapButtons.fire(
          'Édité!',
          "Les informations de l'utilisateur ont été modifiées.",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.EditForm = false;
        this.resetUserForm();
        this.FetchUsers();
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Les informations utilisateur ne sont pas modifiées :)',
          'error'
        )
      }
    })
    return this.res;
  }


  ngOnInit() {
    this.FetchUsers();
  } 

    FetchUsers() {
      this.apiService.getUsers()
          .subscribe(users => this.users = users)
    }

    deleteuser(user) {
      this.ConfirmDelete(user)
      /*this.apiService.removeUser(user)
          .subscribe( user => 
            this.FetchUsers()  )*/
    }
    

    addUser() {
      this.apiService.ajouterUser(this.myUser)
          .subscribe(user => 
            this.FetchUsers() )
        this.resetUserForm();
        //Alert Success
        Swal.fire(
          'Trés Bien!',
          'Vous ajouter un utilisateur avec succès!',
          'success'
        )
        //this.FetchUsers();

      }

    resetUserForm() {
      this.myUser = {
          login: '',
          password: ''
      }
    }

    editFormUser(user) {
      this.myUser = user;
      this.EditForm = true;
    }

    editUser() {
      this.ConfirmEdit(this.myUser);
      /*this.apiService.ModifyUser(this.myUser)
        .subscribe(user => this.FetchUsers())
        this.EditForm = false;
        this.resetUserForm();*/
    }

}
