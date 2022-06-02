import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiveService {
  loggedInUser: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('login_user') || "{}"));
  constructor(private http : HttpClient,private router: Router) { 
    
  }
  login(email:string, idGoogle:string): Observable<any> {
    return this.http.get<any>(`${environment.user_api}/?email=${email}&googleId=${idGoogle}`).pipe(
      map((item)=>{
        if(item.length > 0){
          this.loggedInUser.next(item[0]);
          localStorage.setItem('login_user', JSON.stringify(item[0]));
          return item[0];
        }
        localStorage.removeItem('login_user');
        this.loggedInUser.next({});
        return null;
        
      })
    )
  }
  login_form(email:string, password:string): Observable<any> {
    return this.http.get<any>(`${environment.user_api}/?email=${email}&password=${password}`).pipe(
      map((item)=>{
        if(item.length > 0){
          this.loggedInUser.next(item[0]);
          localStorage.setItem('login_user', JSON.stringify(item[0]));
          return item[0];
        }
        localStorage.removeItem('login_user');
        this.loggedInUser.next({});
        return null;
        
      })
    )
  }
  logout(): void{
  localStorage.removeItem("login_user");
  this.router.navigate(["/login"])
}
getUser(){
  return JSON.parse(localStorage.getItem("login_user")||"{}")
}
update(data:any,id:number):Observable<any>{

  return this.http.put<any>(`${environment.user_api}/${id}`,data)
}
isLoggedIn():boolean{
  const loggedInUser = JSON.parse(localStorage.getItem("login_user")||"{}");
  if(loggedInUser.email == undefined || loggedInUser.email == ""
      || loggedInUser.googleId == undefined || loggedInUser.googleId == ""){
        return false;
      }
  return true;
}
isLoggedInForm():boolean{
  const loggedInUser = JSON.parse(localStorage.getItem("login_user")||"{}");
  if(loggedInUser.email == undefined || loggedInUser.email == ""
      || loggedInUser.password == undefined || loggedInUser.password == ""){
        return false;
      }
  return true;
}
}
