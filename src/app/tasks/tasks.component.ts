import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // variables
  @Input() tasklist: any = null;

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
}
