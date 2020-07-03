/**
 * Component to process all task.
 */

import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Component, OnInit, Output, Input, NgZone, ViewChild } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
import {formatDate } from '@angular/common';
//import { TodolistComponent } from '../todolist/todolist.component'   <-- not good, because leads to recursion Warnings in console (should get variables from todolist)
import { TodolistComponent } from '../todolist/todolist.component'
import {take} from 'rxjs/operators';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  
  /* Variables */
  @Input() user_id : string = "";
  // selected tasklist from todolist 
  @Input() tasklist: any = null;
  // ??? Wofür ist das hier überhaupt ???
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
  scopeMeaning = {
    "": "keine Auswahl",
    1: "unwichtig",
    2: "neutral",
    3: "wichtig",
    4: "sehr wichtig",
    5: "kritisch"
  };

  hiddenFilterForm: boolean = true;
  filterBool: boolean = false;
  scopeFilterValue: number = 0;
  filteredTasks: any = [];
  
  

  constructor(public datastorage: DatastorageService, public Todolist: TodolistComponent, private _ngZone: NgZone) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
  }

  // update the selected tasklist with new values (PUT-Request)
  updateTasklist() {
    let valide = true;
    for (let task of this.tasklist.ownTasks) {
      // looks for a letter
      if (!/\S/.test(task.taskname)) {
        valide = false;
        window.alert("Jede Aufgabe muss einen Namen haben!");
        break;
      }
    }
    // looks for letter
    if (!/\S/.test(this.tasklist.tasklist_name)) {
      valide = false;
      window.alert("Sie müssen Ihrer Aufgabenliste einen Namen geben!");
    }
    if (valide) {
      this.datastorage.updateTasklist(this.tasklist);
      alert("Liste wurde aktualisiert.")
    }
  }

  // deletes an (single) associated task (DELETE-Request)
  deleteTask(tasklist_id, task_id){
    this.datastorage.deleteTask(tasklist_id, task_id);
    // Auswahl beibehalten. Nur die Aufgabe sollte aus der aktuell ausgwählten Liste entfernt werden
    this.showCreateNewTask = false;
    this.Todolist.selectTasklist(null);
    setTimeout(() => {this.Todolist.getAllTasklists(this.user_id)}, 100);
  }

  // activates the form to create a new task
  activateCreateTask() {
    this.showCreateNewTask = this.showCreateNewTask != true;
  }

  // creates a new task (POST-Request)
  createNewTask(){
    let valide = true;
    let statusArr = ["offen", "In Bearbeitung", "erledigt", "verspätet erledigt"];
    // looks for a letter
    if (!/\S/.test(this.newTask.taskname)) {
      valide = false;
      window.alert("Sie müssen der Aufgabe einen Namen geben!");
    }
    if (this.newTask.status == "") {
      valide = false;
      window.alert("Die Aufgabe benötigt einen Status!");
    }
    if (valide) {
      this.newTask.tasklist_id = this.tasklist.id;
      // creates a single task. The selected task ist given as parameter
      this.datastorage.createTask(this.newTask);
      this.showCreateNewTask = false;
      this.Todolist.selectTasklist(null);
      setTimeout(() => {this.Todolist.getAllTasklists(this.user_id)}, 100);
    }
  }

  deactivateDoneTasks(task) {
    this.taskDone = false;
    if (task.status == "verspätet erledigt" || task.status == "erledigt") {
      this.taskDone = true;
    }
    return this.taskDone;
  }

  activateFilterForm () {
    this.hiddenFilterForm = this.hiddenFilterForm != true;
  }

  filtering () {
    
    for (let key of Object.keys(this.tasklist.ownTasks)) {
      if (this.tasklist.ownTasks[key].scope == this.scopeFilterValue) {
        this.filteredTasks.push(this.tasklist.ownTasks[key]);
      }
    }
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }


  exitCompare(a, b) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0; 
  }

  compareDeadlineAsc(a, b) {
    if ( new Date (a.deadline) < new Date(b.deadline) ){
      return -1;
    }
    if ( new Date (a.deadline) > new Date(b.deadline) ){
      return 1;
    }
    return 0; 
  }
  compareDeadlineDesc(a, b) {
    if ( new Date (a.deadline) < new Date(b.deadline) ){
      return 1;
    }
    if ( new Date (a.deadline) > new Date(b.deadline) ){
      return -1;
    }
    return 0; 
  }
}