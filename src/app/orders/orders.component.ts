import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoneComponent } from '../modals/done/done.component';
import { BillComponent } from '../modals/bill/bill.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  arrangBy = "Inprogress"
  data
  orders = []
  status = "Done"
  constructor(public myServer: ServerService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchData()
  }



  fetchData() {
    this.orders = []
    this.myServer.getOrders(this.arrangBy).subscribe(observer => {
      this.data = observer
      this.data.map(x => {
        this.orders.push({
          userPhone: x.userPhone,
          order: this.data.filter(z => z = z.userPhone == x.userPhone)
        })
      })
      this.orders = this.removeDuplicates(this.orders, "userPhone")

      console.log(this.orders)
    })
  }



  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }


  done(order) {
    this.modalService.open(DoneComponent).componentInstance.fromParent = order
  }

  bill(order) {
    this.modalService.open(BillComponent, { size: 'lg' }).componentInstance.fromParent = order

  }

}
