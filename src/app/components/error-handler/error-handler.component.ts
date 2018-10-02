import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {
  @Input() errorMessage: string;
  recievedErrorObject: Object;

  constructor() { }

  ngOnInit() {
    this.recievedErrorObject = JSON.parse(this.errorMessage);
    console.log(this.recievedErrorObject);
  }

  objectKeys(obj) {
    return Object.keys(obj);
}

}
