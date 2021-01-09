import { Component, OnInit } from '@angular/core';
import { AuthService, LogLoad } from '../../auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error
  user:LogLoad={
    username : "",
    password : ""
  }
  constructor(public auth:AuthService,public router:Router) { }

  ngOnInit() {
  }
  login(){
    this.auth.login(this.user).subscribe(()=>{
      this.router.navigateByUrl('/dashboard')
    },(err)=>{
      console.log(err)
      this.error = "something bad happened!"
    })
  }

}
