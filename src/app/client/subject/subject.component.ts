import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  listSubjects : Array<any> = [];
  keyword : string ="";
  constructor(private subjectService : SubjectService) { }

  ngOnInit(): void {
    this.getSubject()
  }
  getSubject(searchKeyword:string = ""){
    this.subjectService.list(searchKeyword).subscribe(data=>{
      this.listSubjects = data
    });
  }
  submitSearch(){
    this.getSubject(this.keyword)
    console.log(this.listSubjects);
    
  }
  
}
