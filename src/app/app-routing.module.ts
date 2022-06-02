import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { StudentAddComponent } from './admin/student-add/student-add.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { SubjectAddComponent } from './admin/subject-add/subject-add.component';
import { SubjectListComponent } from './admin/subject-list/subject-list.component';
import { FinalComponent } from './client/final/final.component';
import { HomeComponent } from './client/home/home.component';
import { QuizComponent } from './client/quiz/quiz.component';
import { SubjectComponent } from './client/subject/subject.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { AdminGuard } from './helpers/admin.guard';
import { QuestionListComponent } from './admin/question-list/question-list.component';
import { QuestionAddComponent } from './admin/question-add/question-add.component';
import { StudentEditComponent } from './admin/student-edit/student-edit.component';
import { QuestionEditComponent } from './admin/question-edit/question-edit.component';

const routes: Routes = [
  {
    path : "",
    component : HomeLayoutComponent,
    children : [
      {
        path : "",
        component : HomeComponent
      },
      {
        path : "mon-hoc",
        component : SubjectComponent
      },
      {
        path : "quiz/:idsubject/score",
        component : FinalComponent,
        canActivate : [AuthGuard]
      },
      {
        path : "quiz/:idsubject",
        component : QuizComponent,
        canActivate : [AuthGuard]

      }
    ]
    
  },
  {
    path : "admin",
    component : AdminLayoutComponent,
    canActivate:[AdminGuard],
    children : [
      {
        path : "",
        component : DashboardComponent
      },
      {
        path : "mon-hoc",
        component : SubjectListComponent
      },
      {
        path : "mon-hoc/add",
        component : SubjectAddComponent
      },
      {
        path : "question-list/:idsubject",
        component : QuestionListComponent
      },
      {
        path : "question-add/:idsubject",
        component : QuestionAddComponent
      },
      {
        path : "question-edit/:idsubject/:idquestion",
        component : QuestionEditComponent
      },
      {
        path : "sinh-vien",
        component : StudentListComponent
      },
      {
        path : "sinh-vien/add",
        component : StudentAddComponent
      },
      {
        path : "sinh-vien/edit/:idUser",
        component : StudentEditComponent
      },
    ]
  },
 {
   path : "login",
   component : LoginComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
