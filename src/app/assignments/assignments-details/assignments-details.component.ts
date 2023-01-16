import { CdkPortal } from '@angular/cdk/portal';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { DarkModeService } from '../../dark-mode.service';

@Component({
  selector: 'app-assignments-details',
  templateUrl: './assignments-details.component.html',
  styleUrls: ['./assignments-details.component.css'],
})
export class AssignmentsDetailsComponent implements OnInit {
  assignmentTransmis!: Assignment | undefined;
  
  matiereImage!:string;
  profImage!:string;
  nomProf!:string;

  constructor(
    private assignmentService: AssignmentsService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router:Router,
    public darkModeService: DarkModeService ,
  ) {}

  ngOnInit(): void {
    this.getAssignment();

  }
  onLogout(){
    this.authService.logOut()
  }
  
  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
      if (assignment){
      this.imgMatiere(assignment);}      
    });
  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    this.assignmentService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  note(){
    var note = this.assignmentTransmis?.note
    console.log(note)
    console.log(!this.assignmentTransmis?.rendu )
    return (note===undefined || this.assignmentTransmis?.rendu)
  }

  onDelete() {
    if (!this.assignmentTransmis) return;

    this.assignmentService
      .deleteAssignement(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);
        this.assignmentTransmis = undefined;
        this.router.navigate(['/home']);
      });
  }

  rendu(){
    if(this.assignmentTransmis?.rendu){
      return 'oui'  
    }
    else {
      return 'non'
    }
  }

// onURLinserted() {
//       this.getImage(this.urlImgMatiere()).subscribe((data: Blob) => {
//         this.createImageFromBlob(data);
//       }, (error: any) => {
//         console.log("Error occured",error);
//       });
// }
// getImage(imageUrl: string): Observable<Blob> {
//   return this.http.get(imageUrl, { responseType: 'blob' });
// }

// createImageFromBlob(image: Blob) {
//    let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
//    reader.addEventListener("load", () => {
//       this.matiereImage = reader.result; // here is the result you got from reader
//    }, false);

//    if (image) {
//       reader.readAsDataURL(image);
//    }
// }

// getImageFromService() {
//   this.isImageLoading = true;
//   this.getImage(this.urlImgMatiere()).subscribe(data => {
//     this.createImageFromBlob(data);
//     this.isImageLoading = false;
//   }, error => {
//     this.isImageLoading = false;
//     console.log(error);
//   });
// }

  imgMatiere(a:Assignment){
    if (a?.nomMatiere=="Technologie du Web"){
      this.matiereImage="./assets/matiereImage/technologie.jpg";
      this.profImage="./assets/matiereImage/buffa.jpeg";
      this.nomProf="Michel Buffa"
    }
    else if(a?.nomMatiere=="Analyse Financiere"){
      this.matiereImage="./assets/matiereImage/analyse.jpg"
      this.profImage="./assets/matiereImage/anigo.jpg"
      this.nomProf="Christophe Anigo"
    }
    else if (a?.nomMatiere=="Planification Projet") {
      this.matiereImage="./assets/matiereImage/planification.png"
      this.profImage="./assets/matiereImage/crescenzo.jpg"
      this.nomProf="Pierre Crescenzo"
    }
    else if (a?.nomMatiere=="Big Data"){
      this.matiereImage="./assets/matiereImage/bigData.jpg"
      this.profImage="./assets/matiereImage/donati.jpg"
      this.nomProf="Léo Donati"
    }
    else {
      this.matiereImage="./assets/matiereImage/management.jpg";
      this.profImage="./assets/matiereImage/tounsi.jpg"
      this.nomProf="Stéphane Tounsi"

    }
  }

  isAdmin():boolean {
   
    var role = this.authService.currentUser.role
    return(role=="teacher" || role =="admin");
     
  }
}
