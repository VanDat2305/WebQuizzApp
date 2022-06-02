import { Component, OnInit } from '@angular/core';
import { AuthServiveService } from 'src/app/services/auth-servive.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  list_user : Array<any> = []
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getData()
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
  getData(){
    this.userService.getUser().subscribe(data=>{
      this.list_user = data
    })
    
  }
  remove(id:number){
    if (confirm("Bạn chắc chắn xóa không??")) {
      this.userService.delete(id).subscribe(data=>{
      this.getData()
      })
    }
  }

}
