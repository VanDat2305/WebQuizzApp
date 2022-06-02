import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router : Router){

 }
  canActivate(): boolean  {
    const loggedInUser = JSON.parse(localStorage.getItem("login_user") || "{}");
    if (loggedInUser.email != undefined  && loggedInUser.email != "" 
        && loggedInUser.googleId !=undefined && loggedInUser.googleId != ""
    ) {
      return true
    }
    this.router.navigate(["/login"])
    return false
}

  
}
