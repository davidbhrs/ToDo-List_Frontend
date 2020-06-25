import { Component, OnInit } from '@angular/core';
import { DatastorageService } from '../datastorage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // Variables
  tasklists: any[] = [];
  tasklist: any[] = null;

  constructor(private datastorage: DatastorageService) { }

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

  selectTasklist(selection) {
    this.tasklist = selection;
    console.log(this.tasklist);
  }

}
