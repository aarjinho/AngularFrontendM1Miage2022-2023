import { OverlayOutsideClickDispatcher } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {
  email=this.authService.currentUser.email
  role=this.authService.currentUser.role

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    if (!this.authService.loggedIn){
      this.router.navigate(['/login'])
    }

  

  }

}
