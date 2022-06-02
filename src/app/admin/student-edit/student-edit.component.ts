import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  userForm = new FormGroup({
    username : new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
    ]),
    name : new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(44),
    ]),
    avatar : new FormControl('',[
      Validators.required,
      Validators.minLength(6),
    ]),
    schoolfee : new FormControl('',[
      Validators.required,
      Validators.minLength(100),
    ]),


  });
  idUser : string = ""
  constructor(
    private userService : UserService,
    private router : Router,
    private router_active : ActivatedRoute
    ) { }

  ngOnInit(): void {
      this.router_active.params.subscribe(par=>{
      this.idUser = par['idUser'];
      this.userService.getUser(this.idUser).subscribe(data=>{
        const user = data[0]
        
        this.userForm = new FormGroup({
          id: new FormControl(user.id),
          username : new FormControl(user.username,[
            Validators.required,
            Validators.minLength(3),
          ]),
          name : new FormControl(user.name,[
            Validators.required,
            Validators.minLength(3),
          ]),
          email : new FormControl(user.email,[
            Validators.required,
            Validators.minLength(3),
            Validators.email,
          ]),
          password : new FormControl(user.password,[
            Validators.required,
            Validators.minLength(6),
      Validators.maxLength(44),
          ]),
          avatar : new FormControl(user.avatar,[
            Validators.required,
            Validators.minLength(6),
             
          ]),
          schoolfee : new FormControl(user.schoolfee,[
            Validators.required,
            Validators.minLength(100),
          ]),
          marks : new FormControl([user.marks]),
          roles : new FormControl([{name:"member"}])

      
        });
        
      })
      
    })

  }

  submitForm(){
    this.userService.update(this.userForm.value).subscribe(data=>{
      this.router.navigate(["/admin/sinh-vien"])
      
    })
    
  }
}
