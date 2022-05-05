import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ // mli drt hadi ban lmoxkil ya3ni maxi mn router-outler 
    { path: '/dashboard', title: 'Dashboard', class: '' },
    { path: '/user-profile', title: 'Gestion des utilisateurs', class: '' },
    { path: '/categorie-management', title: 'Gestion des categories', class:''},
    { path: '/collaborators-management', title: 'Gestion des collaborateurs', class:'' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {//
          return false;
      }
      return true;
  };
}
