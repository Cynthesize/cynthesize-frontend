import { ProfileService } from '@app/core/profile/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@app/core/profile/user';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  user: User = new User();
  username: string;
  sociallinks: any = [];
  errorString: string;
  loggedInUsername: string;
  isFieldEditable = false;

  editForm: FormGroup;

  /* Chip Variables*/

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  listOfTech: any[];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.username = this.route.snapshot.params.username;
    this.loggedInUsername = this.authenticationService.credentials.username;
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      bio: new FormControl(''),
      dob: new FormControl(''),
      listOfTech: new FormControl([]),
      location: new FormControl(''),
      website: new FormControl('')
    });
    this.profileService
      .getUserDetails(this.username)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.router.navigate(['not-found']);
          }
          this.user = data[0];
          this.listOfTech = data[0].technologies;
          this.editForm.get('bio').setValue(data[0].bio);
          this.editForm.get('dob').setValue(data[0].birth_date);
          this.editForm.get('listOfTech').setValue(data[0].technologies);
          this.editForm.get('location').setValue(data[0].location);
          this.editForm.get('website').setValue(data[0].website);
          this.user.social_links.forEach(sociallink => {
            const username = sociallink.substr(sociallink.lastIndexOf('/') + 1, sociallink.length);
            if (sociallink.includes('facebook') || sociallink.includes('github') || sociallink.includes('twitter')) {
              const social =
                (sociallink.includes('facebook') && 'facebook') ||
                (sociallink.includes('github') && 'github') ||
                (sociallink.includes('twitter') && 'twitter');
              this.sociallinks.push({
                socialLink: sociallink,
                username: username,
                logoUrl: '../../../../assets/logos/social/' + social + '-logo.svg'
              });
            } else {
              this.sociallinks.push({
                socialLink: sociallink,
                username: sociallink,
                logoUrl: '../../../../assets/logos/grid-world.svg'
              });
            }
          });
        },
        (error: any) => {
          this.errorString = '';
          for (let i = 0; i < Object.keys(error.error).length; i++) {
            this.errorString +=
              Object.keys(error.error)
                [i].toString()
                .charAt(0)
                .toUpperCase() +
              Object.keys(error.error)
                [i].toString()
                .slice(1) +
              ': ' +
              error.error[Object.keys(error.error)[i]]
                .toString()
                .charAt(0)
                .toUpperCase() +
              error.error[Object.keys(error.error)[i]].toString().slice(1) +
              '\n';
          }
          this.snackBar.open(this.errorString, 'Ok', {
            duration: 10000
          });
        }
      );
  }

  toggleFormFields(toggle: boolean) {
    this.isFieldEditable = toggle;
  }

  onSubmit() {
    const userUpdateObject = {
      bio: this.editForm.get('bio').value,
      location: this.editForm.get('location').value,
      technologies: this.listOfTech,
      birth_date: this.editForm.get('dob').value,
      website: this.editForm.get('website').value
    };
    console.log(userUpdateObject);
    this.profileService
      .UpdateUserDetails(userUpdateObject)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.listOfTech.push(value.trim());
      console.log(this.listOfTech);
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tech: string): void {
    const index = this.listOfTech.indexOf(tech);
    if (index >= 0) {
      this.listOfTech.splice(index, 1);
    }
  }
}
