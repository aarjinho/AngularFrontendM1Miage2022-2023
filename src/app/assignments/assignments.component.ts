import { NumberSymbol } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, pipe} from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  // pageEvent!: PageEvent;
  // pageIndex!:number;
  // pageSize!:number;
  length!:number;
  page: number=1;
  limit: number=20;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
 

  titre = 'Mon application sur les assignments';

  assignments!: Assignment[];

  assignmentSelectionne!: Assignment;
  
  open= false;

  search!:string;

  filter!:string;

  allAssignments!:Assignment[];

  searchedAssignments:Assignment[] = [];

  displayedColumns: string[] = ['Matiere', 'Nom', 'Auteur','Details'];

  dataSource!: MatTableDataSource<Assignment>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private assignmentsService: AssignmentsService,private authService:AuthService,private router:Router) {}
  
//   ngAfterViewInit() {
//     this.dataSource = new MatTableDataSource(this.assignments);
//     this.dataSource.paginator = this.paginator;
  
// }


setData(data:any){
  this.assignments = data.docs;
  this.allAssignments=data.docs;
  // this.page = data.page;
  // this.limit = data.limit;
  this.totalDocs = data.totalDocs;
  this.totalPages = data.totalPages;
  this.hasPrevPage = data.hasPrevPage;
  this.prevPage = data.prevPage;
  this.hasNextPage = data.hasNextPage;
  this.nextPage = data.nextPage;
}
update(){
  this.assignmentsService.getAssignmentsPagine(this.paginator.pageIndex+1,this.paginator.pageSize)
  .subscribe((data)=>{ 
  this.setData(data);
  if (this.filter) {this.onFilter()}
  else if (this.search) { this.onSearch()}
  else{
    setTimeout(()=>
  this.dataSource=new MatTableDataSource(this.assignments),600)
}
})
  
}


  ngOnInit(): void {
    
    if (this.authService.loggedIn){
      this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe((data) => {
        this.setData(data)
        
        this.dataSource = new MatTableDataSource(this.assignments)
        this.dataSource.paginator = this.paginator;  
      },error=> console.log(error)
      );}
      else{
        this.router.navigate(['/login'])

      }
  }
  
  
  onFilter(){
    if (!this.filter){
      this.update()
    }
    else if (this.filter=='rendu') {
      this.searchedAssignments=[];
      this.allAssignments.map( assignment =>{
      if (assignment.rendu){
          this.searchedAssignments.push(assignment)
        }
      })
    }
    else {
      this.searchedAssignments=[]
      this.allAssignments.map( assignment =>{
        if (!assignment.rendu){
          this.searchedAssignments.push(assignment)}})     
      }
    this.assignments=this.searchedAssignments
    this.dataSource=new MatTableDataSource(this.searchedAssignments)
    }
  
  onSearch(){
    if (!this.search){
      this.update()
    }
    else if (this.filter){
      this.searchedAssignments=[]
      this.assignmentsService.search(this.search).subscribe(
        (assignments)=>{
          this.allAssignments=assignments
          this.searchedAssignments=assignments
          this.assignments=assignments
        }
      )
      setTimeout(()=>
      this.onFilter(),600)
      
    }
    else {
      this.searchedAssignments=[]
      this.assignmentsService.search(this.search).subscribe(
        (assignments)=>{
          this.allAssignments=assignments
          this.searchedAssignments=assignments
          this.assignments=assignments
        }
      )
      setTimeout(()=>this.dataSource=new MatTableDataSource(this.searchedAssignments)
      ,600)
    }
  
    // if (!this.search && !this.filter){
    //   this.update();
    // }
    // else if (!this.filter){
    // this.searchedAssignments=[];
    // this.allAssignments.map(assignment =>{
    //   if ( assignment.nom.toLowerCase().includes(this.search.toLowerCase()) || assignment.auteur.toLowerCase().includes(this.search.toLowerCase()) || assignment.nomMatiere.toLowerCase().includes(this.search.toLowerCase())){
    //     this.searchedAssignments.push(assignment);
    //   }
    //    }) 
    //    this.assignments=this.searchedAssignments;
    // }
    // else {
    //   this.onFilter();
    //   this.searchedAssignments=[];
    //   this.assignments.map(assignment =>{
    //     if ( assignment.nom.toLowerCase().includes(this.search.toLowerCase()) || assignment.auteur.toLowerCase().includes(this.search.toLowerCase()) || assignment.nomMatiere.toLowerCase().includes(this.search.toLowerCase())){
    //       this.searchedAssignments.push(assignment);
    //     }
    //      } ) 
    //      this.assignments=this.searchedAssignments;
    // }
    // this.dataSource=new MatTableDataSource(this.searchedAssignments)
    // console.log(this.allAssignments)
    }
  

  onAssignmentClicke(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    this.router.navigate(['/assignment/'+assignment.id])
    console.log(assignment)
  }
  onLogout(){
    this.authService.logOut();
  }
}




