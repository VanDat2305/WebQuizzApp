import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  total_user : number = 0;
  total_subject : number = 0
  constructor(
    private userService : UserService,
    private subjectService : SubjectService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getSubject();
  }

  getUser(){

     this.userService.getUser().subscribe(data=>{
      this.total_user = data.length
    })
  }

  getSubject(){
    this.subjectService.list().subscribe(data=>{
      this.total_subject =data.length
    })
  }
}
