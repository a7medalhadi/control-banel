import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-canceling',
  templateUrl: './canceling.component.html',
  styleUrls: ['./canceling.component.scss']
})
export class CancelingComponent implements OnInit {
  done = false
  error
  progeress = false
  @Input() fromParent;

  constructor(public myServer: ServerService, public activeModal:NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  delete(){
    this.progeress = true
    this.myServer.deleteItem(this.fromParent).subscribe(()=>{
      this.done = true
      this.progeress = false
    },(err)=>{
      this.progeress = false
      this.error = "some thing bad happend"
      console.log(err)
    })
  }

}
