import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {


  constructor(public auth: AuthService) { }

}