import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  projects: any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
	
  }
}