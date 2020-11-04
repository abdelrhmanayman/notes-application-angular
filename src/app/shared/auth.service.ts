import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { usersAPIBaseURL } from "../utils/constants";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService, private msg: NzMessageService) { }

  public login({ username, password }){
    this.http.post(`${usersAPIBaseURL}/login`, {username, password}).subscribe(
      ({user, token}: {user: any, token: string})=>{
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigateByUrl('/')
    }, 
    ({error: {error: {message}}}) => {
      this.msg.error(message)
    })
  }

  public register({user}){
    this.http.post(`${usersAPIBaseURL}/register`, user).subscribe(_ => {
      this.router.navigateByUrl('/login')
      this.msg.success('You registered successfully!')
    },
    ({error: {error: {message}}}) => {
      this.msg.error(message)
    }
    )
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if(!token) return false
    
    return !this.jwtHelper.isTokenExpired(token);
  }

}
