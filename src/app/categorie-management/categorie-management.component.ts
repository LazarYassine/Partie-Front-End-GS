import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from 'app/services/api.service';
import { Categorie } from 'app/models/categorie';

@Component({
  selector: 'app-categorie-management',
  templateUrl: './categorie-management.component.html',
  styleUrls: ['./categorie-management.component.scss']
})
export class CategorieManagementComponent implements OnInit {


  Categories: Categorie[] = [];

  EditForm: boolean = false;

  myCategory: Categorie = {
    categoryName: ''
  }

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.FetchCategories();
  }


  ConfirmDelete(categorie) {
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
        this.apiService.removeCategory(categorie)
        .subscribe( categorie => 
          this.FetchCategories()  );
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          "La categorie a été supprimé",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          "La categorie n'a pas été supprimé  :)",
          'error'
        )
      }
    })
  }

  ConfirmEdit(categorie) {
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
        this.apiService.ModifyCategory(this.myCategory)
        .subscribe(categorie => this.FetchCategories())
        this.EditForm = false;
        this.resetUserForm();
        swalWithBootstrapButtons.fire(
          'Édité!',
          "Les informations de la categorie ont été modifiées.",
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.EditForm = false;
        this.resetUserForm();
        this.FetchCategories();
        swalWithBootstrapButtons.fire(
          'Annulé',
          "Les informations de l'utilisateur ne sont pas modifiées :)",
          'error'
        )
      }
    })
  }

  resetUserForm() {
    this.myCategory = {
      categoryName: ''
    }
  }

  editFormUser(categorie) {
    this.myCategory = categorie;
    this.EditForm = true;
  }


  FetchCategories() {
    this.apiService.getCategories()
      .subscribe(Categories => this.Categories = Categories)
  }

  addCategory() {

    if( Boolean(this.myCategory.categoryName) === false ) {
      Swal.fire(
        'champ vide!',
        'Vous devez Saisir le nome du categorie!',
        'error'
      )
    }
    else {
      this.apiService.ajouterCategory(this.myCategory)
      .subscribe(categorie =>
        this.FetchCategories())
    this.resetUserForm();
    //Alert Success
    Swal.fire(
      'Trés Bien!',
      'Vous ajouter une categorie avec succès!',
      'success'
    )
    }

  }


  deleteCategory(categorie) {

    this.ConfirmDelete(categorie)

  }

  editCategory() {
    this.ConfirmEdit(this.myCategory);
  }

}
