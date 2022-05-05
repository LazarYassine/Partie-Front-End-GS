import { Component, OnInit } from '@angular/core';
import { Collaborateur } from 'app/models/collaborateur';
import { ApiService } from 'app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborators-management',
  templateUrl: './collaborators-management.component.html',
  styleUrls: ['./collaborators-management.component.scss']
})
export class CollaboratorsManagementComponent implements OnInit {


  Collaborateurs: Collaborateur[] = [];

  EditForm: boolean = false;

  myCollaborateur: Collaborateur = {
    nomCollaborateur: '',
    prenomCollaborateur: '',
    adresse: '',
    pays: '',
    ville: '',
    telCollaborateur: ''
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.FetchCollaborateurs();
  }


  ConfirmDelete(collaborateur) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.removeCategory(collaborateur)
        .subscribe( collaborateur => 
          this.FetchCollaborateurs()  );
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          "La Collaborateur a été supprimé",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          "La Collaborateur n'a pas été supprimé  :)",
          'error'
        )
      }
    })
  }

  ConfirmEdit(collaborateur) {
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
      confirmButtonText: 'Oui, éditez-le!',
      cancelButtonText: 'No, annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.ModifyCategory(this.myCollaborateur)
        .subscribe(collaborateur => this.FetchCollaborateurs())
        this.EditForm = false;
        this.resetUserForm();
        swalWithBootstrapButtons.fire(
          'Édité!',
          "Les informations de la collaborateur ont été modifiées.",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.EditForm = false;
        this.resetUserForm();
        this.FetchCollaborateurs();
        swalWithBootstrapButtons.fire(
          'Annulé',
          "Les informations de la collaborateur ne sont pas modifiées :)",
          'error'
        )
      }
    })
  }


  resetUserForm() {
    this.myCollaborateur = {
      nomCollaborateur: '',
      prenomCollaborateur: '',
      adresse: '',
      pays: '',
      ville: '',
      telCollaborateur: ''
    }
  }

  editFormUser(collaborateur) {
    this.myCollaborateur = collaborateur;
    this.EditForm = true;
  }

  FetchCollaborateurs() {
    this.apiService.getCollaborateurs()
      .subscribe(Collaborateurs => this.Collaborateurs = Collaborateurs)
  }



  addCollaborateur() {

    if( Boolean(this.myCollaborateur.nomCollaborateur) === false ||  
    Boolean(this.myCollaborateur.prenomCollaborateur) === false ||
    Boolean(this.myCollaborateur.adresse) === false ||
    Boolean(this.myCollaborateur.pays) === false ||
    Boolean(this.myCollaborateur.ville) === false ||
    Boolean(this.myCollaborateur.telCollaborateur) === false
    ) {
      Swal.fire(
        'champ vide!',
        'Vous devez Saisir le nome du categorie!',
        'error'
      )
    }
    else {
      this.apiService.ajouterCollaborateur(this.myCollaborateur)
      .subscribe(collaborateur =>
        this.FetchCollaborateurs())
    this.resetUserForm();
    //Alert Success
    Swal.fire(
      'Trés Bien!',
      'Vous ajouter un collaborateur avec succès!',
      'success'
    )
    }

  }


  deleteCollaborateur(collaborateur) {

    this.ConfirmDelete(collaborateur)

  }


  editCollaborateur() {
    this.ConfirmEdit(this.myCollaborateur);
  }



}
