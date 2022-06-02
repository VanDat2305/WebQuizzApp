import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }
  
  list(searchKeyword : string = "") : Observable<any>{
    return this.http.get<any>(`${environment.student_api}?email_like=${searchKeyword}`)
  }
  addNew(data: any): Observable<any>{
    return this.http.post<any>(environment.student_api, {...data});
  }
  check_acc(email:string,password:any) : Observable<any>{
    return this.http.get<any>(`${environment.student_api}?email=${email}&password=${password}`)
  }
  update(data:any,id:number):Observable<any>{

    return this.http.put<any>(`${environment.student_api}/${id}`,data)
  }
}
