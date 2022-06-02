import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './client/home/home.component';
import { SubjectComponent } from './client/subject/subject.component';
import { QuizComponent } from './client/quiz/quiz.component';
import {HttpClientModule} from '@angular/common/http';
import { FinalComponent } from './client/final/final.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SubjectListComponent } from './admin/subject-list/subject-list.component';
import { SubjectAddComponent } from './admin/subject-add/subject-add.component';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { StudentAddComponent } from './admin/student-add/student-add.component';

import { QuestionListComponent } from './admin/question-list/question-list.component';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { QuestionAddComponent } from './admin/question-add/question-add.component';
import { StudentEditComponent } from './admin/student-edit/student-edit.component';
import { QuestionEditComponent } from './admin/question-edit/question-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    HomeLayoutComponent,
    HomeComponent,
    SubjectComponent,
    QuizComponent,
    FinalComponent,
    DashboardComponent,
    SubjectListComponent,
    SubjectAddComponent,
    StudentListComponent,
    StudentAddComponent,

    QuestionListComponent,
    QuestionAddComponent,
    StudentEditComponent,
    QuestionEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    PaginatorModule,
    TableModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_CLIENT_ID
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
