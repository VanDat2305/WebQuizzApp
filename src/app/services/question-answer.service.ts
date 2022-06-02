import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {

  constructor(private http : HttpClient) { }
  list(codeSubject : string ) : Observable<any>{
    return this.http.get<any>(`${environment.question_api}/${codeSubject}`)
  }
  getQuestion(codeSubject : string ,id:string) : Observable<any>{
    return this.http.get<any>(`${environment.question_api}/${codeSubject}?id=${id}`)
  }
  post(data:any,codeSubject:any):Observable<any>{
    return this.http.post(`${environment.question_api}/${codeSubject}`,data)
  }
  update(data:any,idQuestion:any,codeSubject:any){
    return this.http.put(`${environment.question_api}/${codeSubject}/${idQuestion}`,data)
  }
  delete(id:any,codeSubject:any){
    return this.http.delete(`${environment.question_api}/${codeSubject}/${id}`)
  }
}
