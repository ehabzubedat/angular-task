import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';
import { Task } from '../models/task';

const baseUrl = 'http://localhost:3030';

const httpURL = {
  createTask: `${baseUrl}/task/new`,
}

@Injectable({
  providedIn: 'root'
})
export class AddTodoListService {

  constructor(private http: HttpClient) { }

  addTask(_id: Types.ObjectId, task: Task): Observable<any> {
    return this.http.post(`${httpURL.createTask}/${_id}`, task);
  }
}
