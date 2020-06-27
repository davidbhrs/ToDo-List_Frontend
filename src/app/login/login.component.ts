import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
// import { timeStamp } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables
  inputUser = {
    name: "",
    pwd: ""
  }
  allUser: any[] = null;
  //loggedin: boolean = false;

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
    this.getUsers();
    //console.log(this.allUser);   // --> OnInit sind allUsers null, bei manuellem Trigger ist das Array tatsächlich befüllt ???
  }

  login() {
    this.getUsers();
    console.log(this.inputUser);
    for (let key of Object.keys(this.allUser)) {
      if (this.allUser[key].username == this.inputUser.name) {
        if (this.allUser[key].password == this.inputUser.pwd) {
          console.log("Herzlich Willkommen " + this.allUser[key].username);
        }
        else {
          console.log("Das eingegebene Passwort ist nicht korrekt");
        }
        break;
      }
      else {
        console.log("Dieser Benutzer existiert nicht. Legen Sie doch jetzt ein neues Benutzerkonto an!");
      }
    
    }
  }

  getUsers() {
    this.datastorage.loadUsers().subscribe(data => {
      this.allUser = data;
    });
  }

}
