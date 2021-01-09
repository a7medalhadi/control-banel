import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  admin : UserDetails =  {
    _id: "",
    username: "",
    name: "",
    manager:false,
    exp: 0,
    iat: 0,
  }
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.getUserDetails()
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  getUserDetails(){
    if(this.auth.isLoggedIn()){
    this.auth.profile().subscribe((user)=>{
      this.admin = user
      console.log(this.admin)
    })}
  }

}
