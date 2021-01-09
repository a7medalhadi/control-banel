import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../../auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  done
  error
  user : TokenPayload = {
    name : "",
    username : "",
    password : ""
  }
  constructor(public auth : AuthService, public router: Router) { }

  ngOnInit() {
  }

  register(){
    delete this.error
    this.auth.register(this.user).subscribe(()=>{
      this.done = "New admin has been added"
    },(err)=>{
      console.log(err)
      this.error = "some thing bad happened"
    })
  }

}
