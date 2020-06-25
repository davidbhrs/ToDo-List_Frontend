import { Component, OnInit } from '@angular/core';
import { DatastorageService } from '../datastorage.service';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {

  // Variables
  tasklists: any[] = [];
  tasklist: any[] = null;
  newTasklist = {
    tasklist_name: "",
    user_id: ""
  }


  constructor(public datastorage: DatastorageService) { }


  /* Methods */
  
  ngOnInit(): void {
    this.getAllTasklists();
  }

  // Gets all tasklists of an user
  getAllTasklists() {
    this.datastorage.loadTasklists().subscribe(data => {
      this.tasklists = data;
      //console.log(this.tasklists);
    });
  }

  // select one tasklist of all tasklists from an user
  selectTasklist(selection) {
    this.tasklist = selection;
    console.log(this.tasklist);
  }

  createTasklist() {
    // #####   STATISCH --> Muss nach Realisierung des Logins angepasst werden !!!   #####
    this.newTasklist.user_id = "1"; 
    this.datastorage.createTasklist(this.newTasklist);
    window.location.reload();
  }

}
