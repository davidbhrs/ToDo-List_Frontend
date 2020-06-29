/**
 * Main component (where everything put together)
 * Processes the tasklists
 */
import { Component, OnInit } from '@angular/core';
import { DatastorageService } from '../datastorage.service';



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


  constructor(public datastorage: DatastorageService) { }


  /* Methods */
  // on init load all tasklists for the navigation
  ngOnInit(): void {
    this.getAllTasklists();
  }

  // Gets all tasklists of an (at the moment static!) user
  getAllTasklists() {
    this.datastorage.loadTasklists().subscribe(data => {
      this.tasklists = data;
    });
  }

  // select one tasklist of all tasklists from an user to show in tasksComponent
  selectTasklist(selection) {
    this.tasklist = selection;
  }

  createTasklist() {
    // #####   STATISCH --> Muss nach Realisierung des Logins angepasst werden !!!   #####
    let valide = true;
    if (!/\S/.test(this.newTasklist.tasklist_name)) {
      valide = false;
      window.alert("Sie müssen Ihrer Aufgabenliste einen Namen geben!");
    }
    if (valide) {
      this.newTasklist.user_id = "1"; 
      this.datastorage.createTasklist(this.newTasklist);
      window.location.reload();
    }
  }

  deleteTasklist(tasklist) {
    this.datastorage.deleteTasklist(tasklist);
    // unschön gelöst, besser die Auswahl irgendwie entfernen
    window.location.reload();
  }
}
