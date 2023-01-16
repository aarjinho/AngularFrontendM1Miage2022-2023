import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsDetailsComponent } from './assignments/assignments-details/assignments-details.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MonCompteComponent } from './mon-compte/mon-compte.component';



const routes:Routes = [
  {path: '', component: RegisterComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent},
  {path: 'assignment/:id', component: AssignmentsDetailsComponent},
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: RegisterComponent},
  {path:'signup',component:SignUpComponent},
  {path:'myAccount',component:MonCompteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent, AssignmentsDetailsComponent,
    RenduDirective,
    AddAssignmentComponent,
    EditAssignmentComponent,
    RegisterComponent,
    SignUpComponent,
    MonCompteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule,
    MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    FormsModule,ReactiveFormsModule, HttpClientModule,MatToolbarModule,MatTableModule,
    MatPaginatorModule,MatSortModule,MatSidenavModule,
    RouterModule.forRoot(routes),MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
