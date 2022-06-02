import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient) { }

  getUser(id:string = ""){
    if (id=='') {
      return this.http.get<any>(`${environment.user_api}`)
    }else{
      return this.http.get<any>(`${environment.user_api}?id=${id}`)
    }
  }

  pushUser(user : any):Observable<any>{
    return this.http.post<any>(`${environment.user_api}`,user)
  }
  update(user : any):Observable<any>{
    console.log(user);
    
    return this.http.put<any>(`${environment.user_api}/${user.id}`,{...user})
  }
  delete(id: number):Observable<any>{
    return this.http.delete<any>(`${environment.user_api}/${id}`);
  }

  check_acc(email:string,password:any) : Observable<any>{
    return this.http.get<any>(`${environment.student_api}?email=${email}&password=${password}`)
  }
}
