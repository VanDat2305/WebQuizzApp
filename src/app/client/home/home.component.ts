import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listSubjects : Array<any> = [];
  subjectOne  = {
    id: "",
    Code: "",
    Name: "",
    Logo: ""
  };
  codeSearch : string = "";
  constructor(private subjectService : SubjectService) { }

  ngOnInit(): void {
    this.getSubject()
  }
  getSubject(searchKeyword:string = ""){
    this.subjectService.list(searchKeyword).subscribe(data=>{
      // console.log(data);
      
      while (this.listSubjects.length < 3) {
        let rand = Math.floor(Math.random()* (data.length))
        if (!this.listSubjects.includes(rand)) {
          this.listSubjects.push(data[rand])
        }
      }
    });
  }

  searchSubmit(){
    
    
    this.subjectService.subject_by_code(this.codeSearch).subscribe(data=>{
      if (data.length>1) {
        this.subjectOne.id="",
        this.subjectOne.Code="",
        this.subjectOne.Logo="",
        this.subjectOne.Name=""
      }else{
        this.subjectOne.id=data[0].id,
        this.subjectOne.Code=data[0].Code,
        this.subjectOne.Logo=data[0].Logo,
        this.subjectOne.Name=data[0].Name
      }
      
    })
    
  }

}
