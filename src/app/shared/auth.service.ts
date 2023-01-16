import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  currentUser!:any;
  loggedIn=false;

  constructor(private http:HttpClient,private router:Router) { }
  logged=new Subject<boolean>();

  getLogChange() {
    return this.logged.asObservable();
  }
  setLogChange(value: boolean) {
    this.logged.next(value);
  }
  uri="https://angularbackendm1miage2022-2023.onrender.com/";
  // uri="http://localhost:3000/";
  signUp(){
    this.http.post(this.uri+"api/auth/register",this.currentUser.value).subscribe( value=>{
      this.router.navigate(['/login']);},
    error=>{
      const message = "Le serveur a rencontré un problème ! Veuillez réessayer";
      alert(message);
      }    
    )
  }
  logIn() {
    this.http.post(this.uri+"api/auth/login",this.currentUser.value).subscribe(
      value=>{
        this.loggedIn=true;
        this.currentUser=value
        this.setLogChange(true);
        this.router.navigate(['/home']);},
      error=>{
        const message = "Votre email ou Mot de passe est incorrect";
        alert(message);
        }         
    )
  }

  logOut() {
    this.http.get(this.uri+"api/auth/logout").subscribe((data)=>{
      console.log(data);
      this.loggedIn = false;
      this.setLogChange(false);
      this.router.navigate(['/login'])

    })
  }

  checkRole(role: string){
    return (role=='admin' ||role=='teacher')
  }
  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isAdmin() {
    console.log(this.currentUser)
    console.log(this.currentUser.role)
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.checkRole(this.currentUser.role));
    });
    return isUserAdmin;
  }
 
}
