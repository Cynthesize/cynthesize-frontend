import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ProfileUpdateService } from '../../../services/profile/profile-update.service';
import * as firebase from 'firebase/app';
import { snapshotChanges } from 'angularfire2/database';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService,private profileDetailUploader: ProfileUpdateService) { }

  ngOnInit() {
  }
  addProfileToDatabase(e) {
    e.preventDefault();
    const Location = e.target.querySelector('#location').value;
    const Organization = e.target.querySelector('#organization').value;
    
    var ProfileDetails = {
      location: Location,
      organization: Organization
    };

    this.profileDetailUploader.uploadTextualData(ProfileDetails);
    
  }
}

  