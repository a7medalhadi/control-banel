import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  done = false
  error
  progeress = false
  @Input() fromParent;
  orders 
  constructor(public myServer: ServerService,public activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.orders = this.fromParent
    console.log(this.orders.order)
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  markAsDone(){
    delete this.error
    this.progeress = true
    for(let x=0;x<this.orders.order.length;x++){
      let orderId = this.orders.order[x]._id
      let data = this.orders.order[x]
      this.myServer.postDoneOrders(data).subscribe(()=>{
        this.myServer.deleteOrder(orderId).subscribe(()=>{
          this.done = true
          this.progeress = false
        },(err)=>{
          this.error = "some thing bad happened"
          this.progeress = false
          console.log(err)
        })
      },(err)=>{
        this.error = "some thing bad happened"
        this.progeress = false
        console.log(err)
      })
    }
  }
}
