import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

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
      Validators.maxLength(44),
    ]),
    schoolfee : new FormControl('',[
      Validators.required,
      Validators.minLength(100),
    ]),
    marks : new FormControl([]),
    googleId : new FormControl(),
    roles : new FormControl([{name:"member"}])

  })

  constructor(
    private userService : UserService,
    private router : Router,
    private SocialService :SocialAuthService
    ) { }

  ngOnInit(): void {
  }
  submitForm(){
    this.userService.pushUser(this.userForm.value).subscribe(data=>{
      alert("Thêm mới thành công")
      this.router.navigate(["/admin/sinh-vien"])
      
    })
    
  }
  get_googleId(){
    this.SocialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(resp => {
      this.userForm = new FormGroup({
          googleId :new FormControl(resp.id),
          email : new FormControl(resp.email),
          name : new FormControl(resp.name,[
            Validators.required,
      Validators.minLength(3)
          ]),
          username : new FormControl(resp.lastName),
          avatar : new FormControl(resp.photoUrl),
          password : new FormControl(''),
          schoolfee : new FormControl(''),
          marks : new FormControl([]),
          roles : new FormControl([{name:"member"}])
          
      })
    })
  }

}
