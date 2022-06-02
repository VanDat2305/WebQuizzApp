import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiveService } from 'src/app/services/auth-servive.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.css']
})
export class FinalComponent implements OnInit {
  codeSubject = "";
  name_subject = "";
  score_subject :number= 0;
  account :any = "";
  constructor(
    private router : ActivatedRoute,
    private Subject : SubjectService,
    private authService : AuthServiveService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(par => {
      this.codeSubject = par['idsubject'];
    })
    this.Subject.subject_by_code(this.codeSubject).subscribe(data=>{
      this.name_subject = data[0].Name
    })
     this.authService.loggedInUser.value.marks.forEach((el:any) => {
       
       if (el.subject==this.codeSubject) {
         this.score_subject = el.score
      }else{
        this.score_subject = 0;
      }
    });
    
  

  }

    
    

  // let data = localStorage.getItem("account")!=null ? localStorage.getItem("account"):null;
  // if (data != null ) {
  //   this.account = JSON.parse(data);
  //   this.codeSubject = this.account.marks.Subject,
  //   this.score_subject = this.account.marks.score
  // }
  
  // console.log(this.account.marks);
}
