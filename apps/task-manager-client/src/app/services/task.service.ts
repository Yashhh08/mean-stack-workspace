import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = "http://localhost:3333/tasks";

  constructor(private http: HttpClient) { }

  createTask(task: any) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(this.baseUrl, task, { headers: headers });
  }

  getAllTasks() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(this.baseUrl, { headers: headers });
  }

  updateTask(taskId: any, task: any) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.patch(this.baseUrl + `/${taskId}`, task, { headers: headers });
  }

  deleteTask(taskId: any) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.delete(this.baseUrl + `/${taskId}`, { headers: headers });
  }

}
