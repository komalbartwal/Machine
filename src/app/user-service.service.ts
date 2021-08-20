import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from './user-registration/user-details';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  createdUserId: number=0;
 
  
   constructor(private http:HttpClient) { }

  public setUserId(createdUserId: number){
    this.createdUserId = createdUserId;
  }
  saveData(user:UserDetails){
    return this.http.post("http://localhost:3000/data",user);
  }
  take(id:number):Observable<UserDetails>{
    return this.http.get<UserDetails>("http://localhost:3000/data/"+id);
  }
  update(user:UserDetails,id:number){
    return this.http.put("http://localhost:3000/data/"+id,user);
    
  }

}
