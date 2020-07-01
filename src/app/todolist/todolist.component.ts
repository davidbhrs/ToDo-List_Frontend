/**
 * Main component (where everything put together)
 * Processes the tasklists
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    this.newTasklist.user_id = user_id; 
    this.datastorage.createTasklist(this.newTasklist);
    
    this.getAllTasklists(user_id);
    this.datastorage.loadTasklists(user_id);
  }

  deleteTasklist(tasklist, user_id) {
    this.datastorage.deleteTasklist(tasklist);
    // unschön gelöst, besser die Auswahl irgendwie entfernen
    this.getAllTasklists(user_id);
    
  }b 
  setIDfromLogin(datas){
    this.user_id = datas;
    this.getAllTasklists(this.user_id);

  }


}

