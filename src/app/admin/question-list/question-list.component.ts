import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionAnswerService } from 'src/app/services/question-answer.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  codeSubject : string = "";
  listQuestion : Array<any> = [];
  text_search = new FormControl("text");
  constructor(
    private question : QuestionAnswerService,
    private router : ActivatedRoute,
    private route : Router
    ) { }

  ngOnInit(): void {
    this.router.params.subscribe(par => {
      this.codeSubject = par['idsubject'];
      this.getQuestion(this.codeSubject)
    })
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  getQuestion(idsubject:string){
    this.question.list(this.codeSubject).subscribe(data=>{
      this.listQuestion = data
      
    })
  }

  remove(id:any,codeSubject:any){
      if (confirm("bạn có muốn xóa không???")) {
        this.question.delete(id,codeSubject).subscribe(data=>{
          this.getQuestion(this.codeSubject);
          this.text_search = new FormControl("")
        })
      }
  }

}
