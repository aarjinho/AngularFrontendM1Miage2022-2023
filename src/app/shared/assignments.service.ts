import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private logginService:LoggingService,
              private http:HttpClient) { }

//  uri = "http://localhost:3000/api/assignments";
uri="https://angularbackendm1miage2022-2023.onrender.com/api/assignments";
//  uri ="mongodb+srv://aarjinho:Uoto8EcqGqpjiUPh@cluster0.9swzbqa.mongodb.net/assignments?retryWrites=true&w=majority";

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri)

    //return of(this.assignments);
  }

  getAssignmentsPagine(page: number,limit:number){

    return this.http.get<Assignment[]>(this.uri+'?page='+page+'&limit='+limit)
  }
  search(name:string):Observable<Assignment[]>{
    return this.http.get<Assignment[]>("https://angularbackendm1miage2022-2023.onrender.com/api/"+name)
  }
  // renvoie comme Observable l'assignment dont l'id est passé
  // en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    /*const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    if(a)

    console.log("getAssignment id= " + id + " nom = " + a.nom)*/
    //return of(a);
    console.log("get by id id = "+id)
    return this.http.get<Assignment>(this.uri + "/" + id)
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);

    //this.logginService.log(assignment.nom, "ajouté !");

    //return of("Assignment ajouté");
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // On n'a besoin de rien faire pour le moment, puisque l'assignment est passé par référence
    // et que l'objet est modifié dans le tableau
    // Plus tard on utilisera un Web Service distant...
    this.logginService.log(assignment.nom, "modifié !");

    return this.http.put<Assignment>(this.uri, assignment);

    // return of("Assignment modifié");
  }

  deleteAssignement(assignment:Assignment) :Observable<Assignment> {
    let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    this.logginService.log(assignment.nom, "supprimé !");

    console.log('Assignement supprimé');
    return this.http.delete<Assignment>(this.uri+"/"+assignment._id);
  }

}
