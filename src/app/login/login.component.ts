import { Component, OnInit, Output, Input } from '@angular/core';
import { DatastorageService } from '../datastorage.service';
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
        
        var hashpwd = CryptoJS.SHA256(this.inputUser.pwd); //konvertiert zu sha256

        //console.log(hashpwd.toString());

        if (this.allUser[key].password == hashpwd) {
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
