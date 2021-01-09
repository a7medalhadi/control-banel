import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  admins
  constructor(public myServer : ServerService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
    this.myServer.getAdmins().subscribe(observer=>{
      this.admins = observer
    })
  }

  deleteAdmin(adminId){
    this.myServer.deleteAdmin(adminId).subscribe(()=>{
      this.fetchData()
    })
  }

}
