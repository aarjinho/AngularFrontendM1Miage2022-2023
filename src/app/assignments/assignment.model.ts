export class Assignment
{
  _id!:string;
  id!: number;
  nom!:string;
  auteur!:string;
  // matiere!:{
  nomMatiere!:string;
    // imageMatiere:{type:string,data:string};
    // photoProf:{type:string,data:string}
  // }
  note!:number;
  remarques!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
}
