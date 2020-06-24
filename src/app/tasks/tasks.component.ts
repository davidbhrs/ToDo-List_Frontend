import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
//import { TodolistComponent } from '../todolist/todolist.component'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // variables
  @Input() tasklist: any = null;
  @Input() allTasks: any = null;
  

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
  }

  updateTasklist() {
    this.datastorage.updateTasklist(this.tasklist);
  }

  deleteTasklist() {
    this.datastorage.deleteTasklist(this.tasklist);
    // unschön gelöst, besser die Auswahl irgendwie entfernen
    window.location.reload();
  }

  deleteTask(tasklist_id, task_id){
    this.datastorage.deleteTask(tasklist_id, task_id);
    window.location.reload();
    // Auswahl beibehalten. Nur die Aufgabe sollte aus der aktuell ausgwählten Liste entfernt werden
  }

  addTask() {
    this.datastorage.loadAllTasks().subscribe(data => {
      this.allTasks = data;
      console.log(this.allTasks);
    });
    //let newID:any = this.allTasks[this.allTasks.length-1];
    if(this.tasklist != null) {
      this.tasklist.ownTasks.push({
        //id: newID,
        taskname: "",
        description: "",
        scope: "",
        deadline: "",
        status: "",
        tasklist_id: this.tasklist.id
      });
    }
  }
}