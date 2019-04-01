import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {
  @Input() username: string;
  @Input() time: string;
  @Input() isMentor: boolean;

  constructor() {}

  ngOnInit() {}
}
