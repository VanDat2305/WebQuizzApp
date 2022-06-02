import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthServiveService } from '../services/auth-servive.service';
import { StudentService } from '../services/student.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mgs:string="";
  loginForm = new FormGroup({
    email : new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password  : new FormControl("",[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(
    private SocialService : SocialAuthService,
    private Account : UserService,
    private auth : AuthServiveService,
    private router : Router
  ) { 
    
  }

  ngOnInit(): void {
  }
  submitForm(){
    var acc = this.loginForm.value;

    this.Account.check_acc(acc.email,acc.password).subscribe(data=>{
      if (data.length>0) {
        localStorage.setItem('login_user', JSON.stringify(data[0]));
        let isset_role = -1;
           data[0].roles.forEach((el:any)=>{
            if (el.name === "admin") {
              isset_role++;
            }
          })
          if (isset_role == -1) {
            this.router.navigate(['/']);
          }else{
            this.router.navigate(['/admin']);
          }
      }else{
        this.mgs = "Tài khoản không tồn tại"
      }
      
    })
  }
  googleLogin(){
    this.SocialService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(resp => {
      this.auth.login(resp.email,resp.id).subscribe(data =>{
        // console.log(data);
        let isset_role = -1;
           data.roles.forEach((el:any)=>{
            if (el.name === "admin") {
              isset_role++;
            }})
            
        if(data){
          let isset_role = -1;
           data.roles.forEach((el:any)=>{
            if (el.name === "admin") {
              isset_role++;
            }
          })
          if (isset_role == -1) {
            this.router.navigate(['/']);
          }else{
            this.router.navigate(['/admin']);
          }
        }else{
          alert("Tài khoản không tồn tại");
        }
      })
    })
  }
}
