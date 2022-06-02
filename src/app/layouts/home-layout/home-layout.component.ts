import { Component, OnInit } from '@angular/core';
import { AuthServiveService } from 'src/app/services/auth-servive.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit {

  check_isset_acc : boolean = false ;
  account : string = "";
  name_user : string = "";
  constructor(private authService : AuthServiveService) {}
  ngOnInit(): void {
    const data = this.authService.getUser();
    this.account = data;
    this.name_user = data.username;
    this.check_isset_acc = Object.values(this.account).length===0;
    
  }
  logout():void{
    this.authService.logout();
  }
  
  
}
