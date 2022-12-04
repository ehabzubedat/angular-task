import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddTodoListService } from '../../services/add-todo-list.service';
import { GetCustomersService } from '../../services/get-customers.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customers: Customer[] = [];
  task: Task ;
  taskForm: FormGroup;
  
  constructor(private addTodoListService: AddTodoListService, private getCustomersService: GetCustomersService, private formBuilder: FormBuilder) { 
    this.task = {} as Task;
    this.taskForm = this.formBuilder.group({
      customer: ['' , [Validators.required]],
      description: [this.task.description, [Validators.required, Validators.maxLength(50)]],
      isDone: false,
      createdAt: Date.now()
    });
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.getCustomersService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  changeCustomer(e: any) {
    this.taskForm.get('customer')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get customerName(): any {
    return this.taskForm.get('customer');
  }

  createTask(): void {
    if(this.taskForm.valid) {
      this.addTodoListService.addTask(this.customerName.value, this.taskForm.value).subscribe(data => {
        if(data.status === 'error') {
          alert(data.message);
        } else {
          alert('Successfully created new task!');
          this.taskForm.get('description')?.setValue('');
        }
      });
    } else {
      alert('Please Enter Valid Data!');
    }
  }
}
