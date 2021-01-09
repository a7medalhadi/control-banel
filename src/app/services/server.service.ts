import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry, timeout } from 'rxjs/operators';
import { Item } from '../editeitem/editeitem.component';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url = 'https://turkstore.herokuapp.com'
  //url = 'http://localhost:5000'
  constructor(private http:HttpClient,public auth : AuthService) { }

//Items****************************************************************************
  addItem(formdata:any) : Observable<any>{
    return this.http.post(this.url+'/items',formdata,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data => data),retry(3),timeout(40000) )
  }
  getItems():Observable<Item>{
    return this.http.get<Item>(this.url+'/items/adminItems').pipe(map(data=>data),retry(3),timeout(40000))
  }
  editeItem(itemId,newData:Item):Observable<Item>{
    return this.http.patch<Item>(this.url+'/items/'+itemId,newData,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }
  getItemById(itemId):Observable<any>{
    return this.http.get(this.url+'/items/itemid/'+itemId).pipe(map(data=>data),retry(3),timeout(40000))
  }
  deleteItem(itemId):Observable<any>{
    return this.http.delete(this.url+'/items/'+itemId,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }
  descount(itemId,prices):Observable<any>{
    return this.http.patch(this.url+'/items/descount/'+itemId,prices,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }



  //Orders*******************************************************************************************
  getOrders(type):Observable<any>{
    return this.http.get(this.url+'/orders/order/'+type,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }

  postDoneOrders(orders):Observable<any>{
    return this.http.post(this.url+'/orders/done',orders,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }

  deleteOrder(orderId):Observable<any>{
    return this.http.delete(this.url+'/orders/'+orderId,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }

  //admins**********************************************************************************************
  getAdmins():Observable<any>{
    return this.http.get(this.url+'/admins',{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }

  deleteAdmin(adminId):Observable<any>{
    return this.http.delete(this.url+'/admins/'+adminId,{ headers: { Authorization: `Bearer ${this.auth.getToken()}` }}).pipe(map(data=>data),retry(3),timeout(40000))
  }
}
