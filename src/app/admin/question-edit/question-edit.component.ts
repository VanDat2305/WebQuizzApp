import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionAnswerService } from 'src/app/services/question-answer.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  form = new FormGroup({
    question: new FormControl("",[
      Validators.required
    ]),
    answers: new FormArray([
      new FormControl('',[
        Validators.required
      ]),
    ])
  });
  arr_answers : Array<any> = []
  index_true : number= 0;
  index_checked : number =0;
  codeSubject: string = "";
  idQuestion : string = "";
  idRandom: number = 0;
  constructor(
    private question_an: QuestionAnswerService,
    private routerActive: ActivatedRoute,
    private router : Router
  ) { }
  ngOnInit(): void {
    var today = new Date();
    var date = today.getHours() + "/" + today.getMinutes() + "/" + today.getDate() + "/" + (today.getMonth() + 1) +"/"+today.getSeconds()+ "/" + today.getFullYear() ;
    var id = date.split('/').join("");
    this.idRandom = Number(id)
    //get id
    this.routerActive.params.subscribe(pas => {
      this.codeSubject = pas['idsubject'],
      this.idQuestion = pas['idquestion']
      this.getQuestion(this.idQuestion,this.codeSubject)
      
    })
  }
 getQuestion(id:any,codeSubject:any){
      this.question_an.getQuestion(codeSubject,id).subscribe(data=>{
        console.log(data[0]);
        this.form = new FormGroup({
          question: new FormControl(data[0].Text,[
            Validators.required
          ]),
          answers: new FormArray([
      
          ])
        });
        
        for (let i = 0; i < data[0].Answers.length; i++) {

          if (data[0].Answers[i].id == data[0].AnswerId ) {
            this.index_checked = i
            this.index_true = i
          }
          this.answers.push(new FormControl(data[0].Answers[i].Text,[
            Validators.required
          ]))
        }
        

      })
 }




  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  addAnswers() {
    this.answers.push(new FormControl("",[
      Validators.required
    ]));
  }
  remove_an(i: number) {
    this.answers.removeAt(i);

  }
  onSubmit() {
    let arr = this.answers.value;
    let arr_change = arr.map((el: any, index:number)=>{
      return {
        id : this.idRandom+index,
        Text : el
      }
    })
    let id_an_true = 0;
     arr_change.forEach((element: any,index :number) => {
      if (index == this.index_true) {
        id_an_true = element.id
      }
    });
    let question = this.form.get("question")?.value;
    var question_answer_post = {
      Text: question,
      Marks: 1,
      AnswerId: id_an_true,
      Answers: arr_change
    }

    this.question_an.update(question_answer_post,this.idQuestion,this.codeSubject).subscribe(data=>{
      this.router.navigate([`/admin/question-list/${this.codeSubject}`])
    })
    
    
  }

  answer_true(i: number) {
    this.index_true = i
  }
}
