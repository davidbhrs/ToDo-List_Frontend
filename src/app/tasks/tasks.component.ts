/**
 * Component to process all task.
 */

import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
//import { TodolistComponent } from '../todolist/todolist.component'   <-- not good, because leads to recursion Warnings in console (should get variables from todolist)

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  /* Variables */
  // selected tasklist from todolist 
  @Input() tasklist: any = null;
  // all tasks in tasklist 
  @Input() allTasks: any = null;
  // boolean to activate the form to create a new task
  showCreateNewTask: boolean = false;
  // "template" with pre set values for a new task (must all be "" --> are set later)
  newTask = {
    taskname: "",
    description: "",
    scope: "",
    deadline: "",
    status: "",
    tasklist_id: ""
  };
  taskDone: boolean = false;
  

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
  }

  // update the selected tasklist with new values (PUT-Request)
  updateTasklist() {
    this.datastorage.updateTasklist(this.tasklist);
  }

  /*   Outsourced to todolist
  deleteTasklist() {
    this.datastorage.deleteTasklist(this.tasklist);
    // unschön gelöst, besser die Auswahl irgendwie entfernen
    window.location.reload();
  }*/

  // deletes an (single) associated task (DELETE-Request)
  deleteTask(tasklist_id, task_id){
    this.datastorage.deleteTask(tasklist_id, task_id);
    window.location.reload();
    // Auswahl beibehalten. Nur die Aufgabe sollte aus der aktuell ausgwählten Liste entfernt werden
  }

  // activates the form to create a new task
  activateCreateTask() {
    this.showCreateNewTask = this.showCreateNewTask != true;
  }

  // creates a new task (POST-Request)
  createNewTask(){
    // task assigned to actual tasklist
    this.newTask.tasklist_id = this.tasklist.id;
    // creates a single task. The selected task ist given as parameter
    this.datastorage.createTask(this.newTask);
    window.location.reload();
  }

  deactivateDoneTasks(task) {
    this.taskDone = false;
    if (task.status == "verspätet erledigt" || task.status == "erledigt") {
      this.taskDone = true;
    }
    else {
      this.taskDone = false;
    }
    return false;
  }
}