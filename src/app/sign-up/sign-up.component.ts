import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  constructor(private Api:AuthService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
   
  form = new FormGroup({
    name:new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    role:new FormControl('')
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
  
  else if (this.form.value.password.length<8){
    alert("Le mot de passe doit avoir plus de 8 caractères ! ")
  }
  else {
    this.Api.currentUser=this.form;
    this.Api.signUp();
  }
}
  }
}