import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  selectedNavItem: string = ''; 

  constructor(public router: Router) {  }

  ngOnInit() {

  }

  handleLinkClick(e: MouseEvent, url: string): void {
    if (url === this.router.url) {
      e.preventDefault();
    }
  }
}
