import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiveService } from 'src/app/services/auth-servive.service';
import { QuestionAnswerService } from 'src/app/services/question-answer.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  codeSubject : string = "";
  listQuestion : Array<any> = [];
  name_subject = "";
  countdown : any;
  question : Array<any> = []
  question_number : number = 0;
  account : any = "";
  random : Array<any> = [];
  user_select_answers :Array<any> = [];
  constructor(
    private router: ActivatedRoute,
    private router_page : Router,
    private QuestionAnswer : QuestionAnswerService,
    private Subject : SubjectService,
    private authService : AuthServiveService,
    private userService : UserService
    ) { }

  ngOnInit(): void {
    this.router.params.subscribe(par => {
      this.codeSubject = par['idsubject'];
    })
    this.getQuestion();
  }
  paginate(event:any){
    
    this.question = [this.listQuestion[event.page]]
    this.question_number = event.page
    
    
  }
  getQuestion(){

    this.Subject.subject_by_code(this.codeSubject).subscribe(data=>{
      this.name_subject = data[0].Name
      
    })
    this.QuestionAnswer.list(this.codeSubject).subscribe(data=>{
      
     let randomArr = this.getNumberArr(10,data.length);
     this.listQuestion = randomArr.map((ind)=>data[ind])
     this.question = [this.listQuestion[0]]
     
     
    })
  };
  
  selectAnswer(qid:number ,aid:number){
    let index_bolean = -1;
    this.user_select_answers.forEach((el,index)=>{
      if (el.qid == qid) {
        index_bolean = index; 
      }
    })
    if (index_bolean==-1) {
      this.user_select_answers.push({
        qid, aid
      })
    }else{
      this.user_select_answers[index_bolean].aid = aid
    }

  }

  private getNumberArr(amount = 10, max =80){
    let arr:Array<number> = [];
    while(arr.length<amount){
      const rand = Math.floor(Math.random()*max);
      if (!arr.includes(rand)) {
        arr.push(rand)
      }
    }
    return arr
  }
  //countdown
  timer = 15*60;

  x = setInterval(()=>{
    
    var minutes = Math.floor(this.timer/60);
    var second = this.timer % 60;
    if (this.timer<=0) {
      clearInterval(this.x);
      alert("hết giờ")
      this.submitQuiz();
    }else{
      this.countdown = minutes + " Phút " + second + " Giây";
    }
    this.timer--
    
  },1000)
  submitQuiz(){
    let corretAns = 0;
    this.user_select_answers.forEach((el)=>{
      let q = this.listQuestion.find(item=>item.id==el.qid);
      
      
      if (q.AnswerId == el.aid) {
        corretAns++;
      }
      
    })
    const score = ((corretAns*10)/this.listQuestion.length).toFixed(2)
    let user = this.authService.loggedInUser.value;
    let index = -1;
    
    console.log(corretAns);
    
    user.marks.forEach((m:any,i:number)=>{
      if (m.subject==this.codeSubject) {
        index = i;
        return;
      }
    })
    if (index == -1) {
      user.marks.push({
        subject : this.codeSubject,
        score : Number(score)
      })
    }else{
      user.marks[index].score = score
    }
    this.userService.update(user).subscribe(res =>{
      console.log(1);
      
      localStorage.setItem('login_user',JSON.stringify(user));
      this.router_page.navigate([`/quiz/${this.codeSubject}/score`])
      
    })
  }


}
