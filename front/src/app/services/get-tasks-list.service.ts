import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

const baseUrl = 'http://localhost:3030';

const httpURL = {
  getAllTasks: `${baseUrl}/tasks`,
}

@Injectable({
  providedIn: 'root'
})
export class GetTasksListService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(httpURL.getAllTasks);
  }

  updateTask(_id: Types.ObjectId, isDone: boolean): Observable<any> {
    return this.http.get(`${httpURL.getAllTasks}/${_id}/${isDone}`);
  }
}
