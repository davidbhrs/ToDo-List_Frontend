import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
import { TodolistComponent } from '../todolist/todolist.component';
// import { timeStamp } from 'console';

import sha256 from 'crypto-js/sha256';
var CryptoJS = require("crypto-js");


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
  //allUserArr: any[] = null;
  //loggedin: boolean = false;

  public login_id = '0';
  @Output() event: EventEmitter<string> = new EventEmitter();

  constructor(public datastorage: DatastorageService) { }

  ngOnInit(): void {
    this.getUsers();
    //console.log(this.allUser);   // --> OnInit sind allUsers null, bei manuellem Trigger ist das Array tatsächlich befüllt ???
  }

  login() {
    this.getUsers();
    for (let key of Object.keys(this.allUser)) {
      var errorMessage = true;
      if (this.allUser[key].username == this.inputUser.name) {
        
        var hashpwd = CryptoJS.SHA256(this.inputUser.pwd); //konvertiert zu sha256

        //console.log(hashpwd.toString());

        if (this.allUser[key].password == hashpwd) {
          alert("Herzlich Willkommen " + this.allUser[key].username);
          errorMessage = false;
          this.login_id = this.allUser[key].id;
          this.sendToParent(this.login_id);
          
        }
        else {
          alert("Das eingegebene Passwort ist nicht korrekt");
          errorMessage = false;
        }
        break;
      }
      else {
        
      }
    }
    if (errorMessage == true){
      alert("Der User exisitert nicht!")
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

  sendToParent(login_id){
    this.event.emit(login_id);
  };


}
