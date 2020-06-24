import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables
  inputUser: any[] = ["", ""]
  allUser: any[] = null;
  //loggedin: boolean = false;

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
  }

  login() {
    this.datastorage.loadUsers().subscribe(data => {
      this.allUser = data;
    });
    /*for (let user of this.allUser) {
      if (user.username == this.inputUser[0] && user.password == this.inputUser[1]) {
        
      }
      else {

      }
    }*/
  }

  showArray() {
    console.log(this.allUser);
  }
}
