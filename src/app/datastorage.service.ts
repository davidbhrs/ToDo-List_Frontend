/**
 * "Data-Acces-Service"
 * Service to interact with backend
 * (We can share variables and logic over this)
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { threadId } from 'worker_threads';  //?? Woher kommt das ??

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private httpClient: HttpClient) { }

  /* GET-Methods */
  loadTasklists(): Observable<any> {
    // lädt aktuell nur den User mit der ID = 1. 
    return this.httpClient.get("/Perschke-Webanwendung/BACKEND/public/tasklists?user_id=1");
  }

  loadUsers(): Observable<any> {
    return this.httpClient.get("/Perschke-Webanwendung/BACKEND/public/lists_user");
  }

  loadAllTasks(): Observable<any> {
    return this.httpClient.get("/Perschke-Webanwendung/BACKEND/public/tasks");
  }


  /* POST-Methods */
  createTask(task) {
    this.httpClient.post("/Perschke-Webanwendung/BACKEND/public/task", task).subscribe();
  }

  createTasklist(tasklist) {
    this.httpClient.post("/Perschke-Webanwendung/BACKEND/public/tasklist", tasklist).subscribe();
  }


  /* PUT-Methods */
  updateTasklist(tasklist) {
    //console.log(tasklist);
    this.httpClient.put("/Perschke-Webanwendung/BACKEND/public/tasklist/" + tasklist.id, tasklist).subscribe();
  }

  /* DELETE-Methods */
  deleteTasklist(tasklist) {
    this.httpClient.delete("/Perschke-Webanwendung/BACKEND/public/tasklist/" + tasklist.id, tasklist).subscribe();
  }

  deleteTask(tasklist_id, task_id) {
    this.httpClient.delete("/Perschke-Webanwendung/BACKEND/public/task/" + tasklist_id + "/" + task_id).subscribe();
  }
}
