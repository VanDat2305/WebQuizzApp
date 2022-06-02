import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects : Array<any> = [];
  constructor(
    private subjectService : SubjectService
  ) {
   }

  ngOnInit(): void {
    this.getSubject()
  }

  getSubject(searchKeyword:string = ""){
    this.subjectService.list(searchKeyword).subscribe(data=>{
      this.subjects = data
    });
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  remove(idsubject:string){
    if (confirm("bạn có muốn xóa hay không")) {
      this.subjectService.remove(idsubject).subscribe(
        data=>{
          this.getSubject()
        }
      )
    }
    
  }
  

}
