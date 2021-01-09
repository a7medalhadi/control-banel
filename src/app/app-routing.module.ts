import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingItemComponent } from './adding-item/adding-item.component';
import { ItemsComponent } from './items/items.component';
import { EditeitemComponent } from './editeitem/editeitem.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { CommonModule } from '@angular/common';
import { CancelingComponent } from './modals/canceling/canceling.component';
import { DescountComponent } from './modals/descount/descount.component';
import { BillComponent } from './modals/bill/bill.component';
import { DoneComponent } from './modals/done/done.component';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { NgbModule } from '../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from '../../node_modules/ng2-charts';
import { MatChipsModule, MatFormFieldModule, MatExpansionModule, MatIconModule } from '../../node_modules/@angular/material';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NgxPrintModule } from '../../node_modules/ngx-print';
import { AuthguardService } from './authguard.service';
import { ManagerguardService } from './managerguard.service';
import { AdminsComponent } from './admins/admins.component';


const routes: Routes = [
  { path: 'add-item', component: AddingItemComponent,canActivate: [AuthguardService] },
  { path: 'items', component: ItemsComponent,canActivate: [AuthguardService] },
  { path: 'editeitem/:itemId', component: EditeitemComponent,canActivate: [AuthguardService] },
  { path: 'orders', component: OrdersComponent,canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponent,canActivate: [ManagerguardService] },
  { path: 'admins', component: AdminsComponent,canActivate: [ManagerguardService] },

];

@NgModule({
  declarations: [
    CancelingComponent,
    DescountComponent,
    BillComponent,
    DoneComponent,
    AddingItemComponent,
    ItemsComponent,
    EditeitemComponent,
    RegisterComponent,
    OrdersComponent,
    AdminsComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    NgxPrintModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    CancelingComponent,
    DescountComponent,
    BillComponent,
    DoneComponent,
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
