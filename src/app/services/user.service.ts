import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { NAJA_API } from './naja.api'

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${NAJA_API}/authenticate`, user);
  }
  
 /* createOrUpdate(user:User){
    if(user.id != null){
      return this.http.put(`${NAJA_API}/userRoute/update`, user);
    }else{
      user.id = null;
      return this.http.post(`${NAJA_API}/userRoute/register`,user);
    }
  }*/
}
