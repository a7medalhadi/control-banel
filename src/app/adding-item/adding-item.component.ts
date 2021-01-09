import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-adding-item',
  templateUrl: './adding-item.component.html',
  styleUrls: ['./adding-item.component.scss']
})
export class AddingItemComponent implements OnInit {
  sending
  done = false
  error 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  tags= [];
  sizes = [];
  name
  price
  brand
  description
  gender
  classification
  colors
  fileToUpload
  formdata = new FormData()
  dataForm
  constructor(public myServer : ServerService) { }

  ngOnInit() {

  }

  onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
    this.formdata.append("file", this.fileToUpload);
  }
  submitItem(){
    this.sending = true
    this.done = false
    this.error = ""
    this.formdata.append('name',this.name)
    this.formdata.append('price',this.price)
    this.formdata.append('brand',this.brand)
    this.formdata.append('gender',this.gender)
    this.formdata.append('classification',this.classification)
    this.formdata.append('sizes',this.sizes.join(' '))
    this.formdata.append('colors',this.colors)
    this.formdata.append('tags',this.tags.join(' '))
    this.formdata.append('description',this.description)
      this.myServer.addItem(this.formdata).subscribe(()=>{
      console.log('done')
        this.formdata = new FormData()
       this.name = ""
       this.price = 0
       this.brand = ""
       this.gender = ""
       this.colors = ""
       this.classification = ""
       this.description = ""
       this.sizes = []
       this.tags = []
       this.fileToUpload = ""

      this.sending =false
      this.done = true
    },(err)=>{
      this.formdata = new FormData()
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
