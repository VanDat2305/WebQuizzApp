import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuestionAnswerService } from 'src/app/services/question-answer.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {

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


  index_true : number= 0;
  codeSubject: string = "";
  idRandom: number = 0;
  constructor(
    private question_an: QuestionAnswerService,
    private routerActive: ActivatedRoute,
    private router : Router,
  ) { }
  ngOnInit(): void {
    var today = new Date();
    var date = today.getHours() + "/" + today.getMinutes() + "/" + today.getDate() + "/" + (today.getMonth() + 1) +"/"+today.getSeconds()+ "/" + today.getFullYear() ;
    var id = date.split('/').join("");
    this.idRandom = Number(id)
    //get id
    this.routerActive.params.subscribe(pas => {
      this.codeSubject = pas['idsubject']
      
    })

  }
  ;
  
  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  addAnswers() {
    console.log(this.form.get('answers'));
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

    this.question_an.post(question_answer_post,this.codeSubject).subscribe(data=>{
      this.router.navigate([`/admin/question-list/${this.codeSubject}`])
    })
    
    
  }

  answer_true(i: number) {
    this.index_true = i
  }

}


