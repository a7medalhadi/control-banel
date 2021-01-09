import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import {  Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CancelingComponent } from '../modals/canceling/canceling.component';
import { DescountComponent } from '../modals/descount/descount.component';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  searchFor
  data 
  gender = "All"
  classification = "All"
  constructor(public myServer:ServerService, public router: Router,private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
    this.myServer.getItems().subscribe(data=>{
      this.data = data
      console.log(data)
    })
  }

  editeItem(itemId){
    this.router.navigateByUrl('admin/editeitem/'+itemId)
  }

  deleteItem(id){
    this.modalService.open( CancelingComponent ).componentInstance.fromParent = id

  }

  search(){
    this.myServer.getItems().subscribe(data=>{
      this.data = data
      this.data = this.data.filter(x => { 
        var s = this.searchFor.split(" ")
        for(let i = 0; i<s.length; i++){
            return x = x.name.split(" ").includes(s[i])
        }
      })
    }
    )}

  classifeing(){
    if(this.gender == "All" && this.classification == "All"){
      this.fetchData()
    }else{
      if(this.gender=="All"){
        console.log("1")
        this.myServer.getItems().subscribe(data=>{
          this.data = data
          this.data = this.data.filter(x=> x = x.classification == this.classification)
        }) }else{
        if(this.classification == "All"){
          console.log("2")
          this.myServer.getItems().subscribe(data=>{
            this.data = data
            this.data = this.data.filter(x=> x = x.gender == this.gender)
          })
        }else{
          console.log("3")
          this.myServer.getItems().subscribe(data=>{
            this.data = data
            this.data = this.data.filter(x=>  x = (x.gender == this.gender) && (x.classification == this.classification))
          })
        }
      }
    }
  }

  descount(id){
    this.modalService.open( DescountComponent ).componentInstance.fromParent = id

  }
}
  