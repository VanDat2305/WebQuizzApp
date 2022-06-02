import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthServiveService } from 'src/app/services/auth-servive.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  username: string = "";
  avatar: string = "";

  constructor(
    private authService: AuthServiveService,
    private userService: UserService,
    // private primengConfig: PrimeNGConfig
  ) {
    this.username = this.authService.loggedInUser.value.username;
    this.avatar = this.authService.loggedInUser.value.avatar;
  
  }

  ngOnInit(): void {
    // this.primengConfig.ripple = true;

  }
}
