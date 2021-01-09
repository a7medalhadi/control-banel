import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '../../../node_modules/@angular/material';
import { ServerService } from '../services/server.service';
import { ENTER } from '../../../node_modules/@angular/cdk/keycodes';
import { Router, Route, ActivatedRoute } from '../../../node_modules/@angular/router';

export interface Item {
  tags : string
  sizes : string
  name : string
  price : number
  brand : string
  description : string
  gender : string
  classification : string
  colors : string
}
@Component({
  selector: 'app-editeitem',
  templateUrl: './editeitem.component.html',
  styleUrls: ['./editeitem.component.scss']
})
export class EditeitemComponent implements OnInit {
  id 
  sending
  done = false
  error 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags= [];
  sizes = [];
  newData : Item
  constructor(public myServer : ServerService, public activeRoute:ActivatedRoute) { }
  
  ngOnInit() {
    this.fetchData()
  }

  fetchData(){
    this.activeRoute.params.subscribe(data=>{
      this.id = data.itemId
      this.myServer.getItemById(data.itemId).subscribe(observer=>{
        this.tags= observer.tags.split(' ')
        this.sizes = observer.sizes.split(' ')
        this.newData = observer
        console.log(this.newData)

      })
    })
  }

  submitItem(){
    this.sending = true
    this.done = false
    this.error = ""

    this.newData.sizes = this.sizes.join(' ')
    this.newData.tags = this.tags.join(' ')

    console.log(this.newData)
      this.myServer.editeItem(this.id,this.newData).subscribe(()=>{
      console.log('done')
      this.sending =false
      this.done = true
    },(err)=>{
      console.log(err)
      this.sending =false
      if(err.status == 400){
        this.error = err.error.message
      }else{
        this.error = "something bad happens"
      }
    })
  }

  add(input , value , arr): void {
    // Add our fruit
    if ((value || '').trim()) {
      arr.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(arr,element): void {
    const index = arr.indexOf(element);

    if (index >= 0) {
      arr.splice(index, 1);
    }
  }

  addtag(event:MatChipInputEvent){
    const input = event.input
    const value = event.value
    this.add(input , value , this.tags)
    console.log(this.tags.join(' '))
  }
  addsize(event:MatChipInputEvent){
    const input = event.input
    const value = event.value
    this.add(input , value , this.sizes)
    console.log(this.sizes)
  }
  removetag(tag){
    this.remove(this.tags,tag)
  }
  removesize(size){
    this.remove(this.sizes,size)
  }
}
