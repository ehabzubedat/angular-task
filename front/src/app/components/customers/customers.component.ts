import { Component, OnInit } from '@angular/core';
import { GetCustomersService } from '../../services/get-customers.service';
import { Customer } from '../../models/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Types } from 'mongoose';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

declare let $: any;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  isBusy: boolean = true;
  customer: Customer;
  customerForm: FormGroup;
  faTrash = faTrash;

  constructor(private getCustomersService: GetCustomersService, private formBuilder: FormBuilder) {
      this.customer = {} as Customer;
      this.customerForm = this.formBuilder.group({
        name: [this.customer.name, [Validators.maxLength(30)]],
        occupation: [this.customer.occupation, [Validators.maxLength(30)]],
        phone: [this.customer.phone, [Validators.pattern(`^\\+?(972|0)(\\-)?0?(([23489]{1}\\d{7})|[5]{1}\\d{8})$`)]],
        email: [this.customer.email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      });
    }

  ngOnInit(): void { 
    this.getCustomers();
  }

  getCustomers(): void { 
    this.isBusy = true;
    this.getCustomersService.getCustomers().subscribe(data => {
      this.customers = data;
      this.isBusy = false;
    });
  }

  deleteCustomer(_id: Types.ObjectId, index: number): void {
    this.getCustomersService.deleteCustomer(_id).subscribe(data => {
      this.customers.splice(index, 1);
    })
  }

  createCustomer(): void {
    if(this.customerForm.valid) {
      let newCustomer = this.customerForm.value;
      this.getCustomersService.createCustomer(this.customerForm.value).subscribe(data => {
        if(data.status === 'success') {
          this.customers.push(newCustomer);
          let element: HTMLElement = document.getElementById('btn-close') as HTMLElement;
          element.click();
        }
      });
    }
    this.customerForm.reset();
  }

}
