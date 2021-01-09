import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-descount',
  templateUrl: './descount.component.html',
  styleUrls: ['./descount.component.scss']
})
export class DescountComponent implements OnInit {
  @Input() fromParent;
  done = false
  error
  progeress = false
  oldPrice
  newPrice


  constructor(public myServer: ServerService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  submit() {
    delete this.error
    this.progeress = true
    let prices = [{propName: "descountPrice",value: this.oldPrice}, {propName: "price",value: this.newPrice},{propName:"descount", value: "true"}]
    this.myServer.descount(this.fromParent,prices).subscribe(()=>{
      this.progeress = false
      this.done = true
    },(err)=>{
      console.log(err)
      this.progeress = false
      this.error = "some thing bad happend try again"
    })
  }


}
