import { Injectable } from '@angular/core';
import { AuthService, UserDetails } from './auth.service';
import { Router } from '../../node_modules/@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ManagerguardService {
  manager : UserDetails = {
    _id: "",
    username: "",
    name: "",
    manager:false,
    exp: 0,
    iat: 0
  }
  constructor(private auth: AuthService, private router: Router) {
  }
  
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    } 
      this.auth.profile().subscribe(user=>{
        this.manager = user
        console.log(this.manager.manager)
      })
      return this.manager.manager

  }}
