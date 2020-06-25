import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables
  inputUser: any[] = ["", ""]
  allUser: any[] = null;
  allUserArr: any[] = null;
  //loggedin: boolean = false;

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  login() {
    this.getUsers();
    //console.log(this.allUser);
    for (let user in this.allUser[1]) {
      console.log(user);
    }
    /*for (let user of this.allUser) {
      if (user.username == this.inputUser[0] && user.password == this.inputUser[1]) {
        
      }
      else {

      }
    }*/
  }

  getUsers() {
    this.datastorage.loadUsers().subscribe(data => {
      this.allUser = data;
    });
  }

}
