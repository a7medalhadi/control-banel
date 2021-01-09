import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  @Input() fromParent
  data
  date
  total = 0
  constructor( public activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.data = this.fromParent
    this.date = new Date(this.data.order[0].date)
    this.data.order.map(x=>{
      this.total = this.total + x.itemPrice
    })
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }


}
