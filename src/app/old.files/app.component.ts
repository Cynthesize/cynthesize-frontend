import { Component ,OnInit} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AlertService, AlertMessage } from './core/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items: Observable<any[]>;
  objAlert: AlertMessage;
  constructor(db: AngularFirestore,private alertService: AlertService) {
    this.items = db.collection('items').valueChanges();
  }
  ngOnInit() {
        ///this.alertService.alertStatus.subscribe((val: AlertMessage) => {
        ///    this.objAlert = { show: val.show, message: val.message };
        ///});
    }

    onCloseAlert(reason: string) {
        let objCloseAlert: AlertMessage = { show: false, message: '' };
        this.alertService.showAlert(false, null);
    }
}
