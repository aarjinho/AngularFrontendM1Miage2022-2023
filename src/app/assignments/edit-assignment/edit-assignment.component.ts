import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { DarkModeService } from '../../dark-mode.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateDeRendu!: Date;
 auteur:string='';
 note:number | undefined;
 remarques:string='';
 nomMatiere:string='';
 isLinear = false;


 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private authService:AuthService,
   private router: Router,
   public darkModeService: DarkModeService ,
 ) {}

 ngOnInit(): void {
   this.getAssignment();
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];

  this.assignmentsService.getAssignment(id).subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.auteur=assignment.auteur;
    this.nomMatiere=assignment.nomMatiere;
    this.note=assignment.note;
    this.remarques=assignment.remarques;
  });
}
onLogout(){
  this.authService.logOut()  }
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignment.auteur=this.auteur
  this.assignment.nomMatiere=this.nomMatiere
  this.assignment.note!=this.note
  this.assignment.remarques=this.remarques
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);
      alert("Edition réussite")
      // navigation vers la home page
      this.router.navigate(['/home']);
    });
}
}
