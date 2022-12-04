import { Component, OnInit } from '@angular/core';
import { GetTasksListService } from '../../services/get-tasks-list.service';
import { Task } from '../../models/task';
import { Customer } from '../../models/customer';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  isBusy: boolean = true; 
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;

  constructor(private getTasksService: GetTasksListService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void { 
    let tasks: Task[] = [];
    this.isBusy = true;
    this.getTasksService.getTasks().subscribe(data => {
      data.forEach((customer: Customer) => {
        let customerName = customer.name;
        (customer.tasks).forEach((task: Task) => {
          task.customer = customerName;
          tasks.push(task);
        });
      });
      this.tasks = tasks.sort(
        (a, b) =>  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      this.isBusy = false;
    });
  }

}
