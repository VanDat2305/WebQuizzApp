import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http : HttpClient) { }
  list(searchKeyword : string = "") : Observable<any>{
    return this.http.get<any>(`${environment.subject_api}?Name_like=${searchKeyword}`)
  }
  subject_by_code(searchKeyword : string = "") : Observable<any>{
    return this.http.get<any>(`${environment.subject_api}?Code_like=${searchKeyword}`)
  }
  remove(idsubject:string){
    return this.http.delete<any>(`${environment.subject_api}/${idsubject}`)
  }
}
