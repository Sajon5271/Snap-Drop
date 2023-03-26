import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit{
  // user?: User;
  order!:Order;
  status:string ='';
  retake_needed: boolean = false;

  
  constructor(private _formBuilder: FormBuilder, private orderService : OrderService, private router: Router) {}
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  ngOnInit(){
    // const user = this.userService.getUser().subscribe((response)=> {
    //   this.user= response;
    // }) 
    const userOrder = this.orderService.getCustomerLatestOrder().subscribe((response) =>{
      this.order = response;
      if(this.order.orderStatus == "retake_needed"){
        this.retake_needed=true;
      };
      if(this.order.orderStatus == "pending"){
        this.status='0';
      };
      if(this.order.orderStatus == "approved"){
        this.status='1';
      };
      if(this.order.orderStatus == "printing"){
        this.status='2';
      };
      if(this.order.orderStatus == "readyToDeliver"){
        this.status='3';
      };
    })
  }
  goBack(){
    this.router.navigate(['user_dashboard']);
  }
  
}
