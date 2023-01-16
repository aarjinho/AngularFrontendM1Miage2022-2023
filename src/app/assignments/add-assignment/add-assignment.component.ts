import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, Validators} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  isLinear = false;


  // emetteur de l'événementy (nouvelAssignment)

  // du formulaire
  nomDevoir: string = '';
  dateDeRendu!: Date;
  auteur:string='';
  note:number=0;
  remarques:string='';
  nomMatiere:string='';
  // imageMatiere!:{type:string,data:string};
  // photoProf!:{type:string,url:string};

  constructor(private assignmentsService:AssignmentsService,private authService:AuthService,
    private router :Router ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn){
     this.router.navigate(['/login']) 
    }
  }

  

  onSubmit() {
   
    console.log(this.nomDevoir + ' a rendre le ' + this.dateDeRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur=this.auteur;
    newAssignment.note=this.note;
    newAssignment.remarques=this.remarques;
    newAssignment.id = Math.floor(Math.random()*100000000);
    newAssignment.nomMatiere=this.nomMatiere;
     
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    if (!this.nomDevoir|| !this.dateDeRendu || !this.auteur || !this.note || !this.remarques || !this.nomMatiere ) {
      alert('Veuillez remplir tout les champs !' );
      return;
    }
    else if (Number.isNaN(+newAssignment.note)||+newAssignment.note>20 || +newAssignment.note<0){
      alert('Veuillez donner une note valide')
    }
    else {
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        alert('Assignment reçu !')
      });
    }
  }
}
