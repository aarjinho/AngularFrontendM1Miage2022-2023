import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DarkModeService } from '../dark-mode.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  loggedIn=this.Api.loggedIn;
  constructor(private Api:AuthService,private router:Router, public darkModeService: DarkModeService) { }

 


  ngOnInit(): void {
    if (this.loggedIn) {this.router.navigate(['/home'])}
  }
   
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });



  sendData(){
    if (!this.form.value.email || !this.form.value.password){
      alert("Veuillez Remplir tous les champs")
    }
    else {
    if (!this.form.value.email.match(/^\S+@\S+\.\S+$/
    )){
      alert("Veuillez entrer un email valide!")
    }

  else {
    
    this.Api.currentUser=this.form;
    this.Api.logIn();}
  }
}
  onSignUp(){
    this.router.navigate(['/signup'])
  }

  
  }
