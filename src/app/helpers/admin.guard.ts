import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { iif, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
   private router : Router
  ){

  }
  canActivate(): boolean  {
    const loggedInUser = JSON.parse(localStorage.getItem("login_user") || "{}");
    if (loggedInUser.email != undefined  && loggedInUser.email != "" 
        && loggedInUser.googleId != undefined && loggedInUser.googleId != ""
    ) {
      let isset_role = -1;
           loggedInUser.roles.forEach((el:any)=>{
            if (el.name === "admin") {
              isset_role++;
            }
          })
          if (isset_role !=-1) {
            return true;
          }
     
    }else if(loggedInUser.googleId == undefined){
      this.router.navigate(["/"])
      return true;
    }
    this.router.navigate(["/login"])
    return false;
  }
  
}
