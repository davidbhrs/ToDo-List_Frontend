/**
 * Main component (where everything put together)
 * Processes the tasklists
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
import { threadId } from 'worker_threads';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {

  /* Variables */
  // all tasklists
  tasklists: any[] = [];
  // selected tasklist
  tasklist: any[] = null;
  // template for new tasklist
  newTasklist = {
    tasklist_name: "",
    user_id: ""
  }

  public user_id: string;
  loggedIn: boolean = true;

  constructor(public datastorage: DatastorageService) { }

  //@Output() event: EventEmitter<string> = new EventEmitter();

  /* Methods */
  // on init load all tasklists for the navigation
  ngOnInit(): void {
    this.getAllTasklists(this.user_id);
  }

  // Gets all tasklists of an (at the moment static!) user
  getAllTasklists(user_id) {
    this.datastorage.loadTasklists(user_id).subscribe(data => {
      this.tasklists = data;
    });
  }

  // select one tasklist of all tasklists from an user to show in tasksComponent
  selectTasklist(selection) {
    this.tasklist = selection;
  }

  createTasklist(user_id) {
    // #####   STATISCH --> Muss nach Realisierung des Logins angepasst werden !!!   #####
    let valide = true;
    if (!/\S/.test(this.newTasklist.tasklist_name)) {
      valide = false;
      window.alert("Sie müssen Ihrer Aufgabenliste einen Namen geben!");
    }
    if (valide) {
      this.newTasklist.user_id = user_id; 
      this.datastorage.createTasklist(this.newTasklist);
      setTimeout(() => {this.getAllTasklists(user_id)}, 50);
    }
  }

  deleteTasklist(tasklist, user_id) {
    this.datastorage.deleteTasklist(tasklist);
    // unschön gelöst, besser die Auswahl irgendwie entfernen
    setTimeout(() => {this.getAllTasklists(user_id)}, 50);
    setTimeout(() => {this.selectTasklist(null)}, 50);
    
  } 
  setIDfromLogin(datas){
    this.user_id = datas;
    this.getAllTasklists(this.user_id);
    this.loggedIn = false;

  }


}

