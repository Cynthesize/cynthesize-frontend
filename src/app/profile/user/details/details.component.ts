import { ProfileService } from '@app/core/profile/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '@app/core/profile/user';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatDialog } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  userProjects: Array<Object>;
  userIdeas: Array<Object>;
  user: User = new User();
  isPageLoaded = false;
  username: string;
  sociallinks: any = [];
  isFieldEditable = false;
  isSameUser = localStorage.getItem('username') === this.router.url.split('/')[2];

  editForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  listOfTech: any[];
  selectedFile: ImageSnippet;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private dialog: MatDialog
  ) {
    this.username = this.route.snapshot.params.username;
  }

  ngOnInit() {
    this.editForm = new FormGroup({
      username: new FormControl(),
      bio: new FormControl(),
      dob: new FormControl(),
      listOfTech: new FormControl([]),
      location: new FormControl(),
      website: new FormControl()
    });

    this.profileService.getUserDetails(this.username).subscribe(
      (data: any) => {
        if (data.user.length === 0) {
          this.router.navigate(['not-found']);
        }
        console.log(data);
        this.isPageLoaded = true;
        this.user = data.user[0];
        this.listOfTech = data.user[0].technologies || [];
        // this.user.social_links.forEach(sociallink => {
        //   const username = sociallink.substr(sociallink.lastIndexOf('/') + 1, sociallink.length);
        //   if (sociallink.includes('facebook') || sociallink.includes('github') || sociallink.includes('twitter')) {
        //     const social =
        //       (sociallink.includes('facebook') && 'facebook') ||
        //       (sociallink.includes('github') && 'github') ||
        //       (sociallink.includes('twitter') && 'twitter');
        //     this.sociallinks.push({
        //       socialLink: sociallink,
        //       username: username,
        //       logoUrl: '../../../../assets/logos/social/' + social + '-logo.svg'
        //     });
        //   } else {
        //     this.sociallinks.push({
        //       socialLink: sociallink,
        //       username: sociallink,
        //       logoUrl: '../../../../assets/logos/grid-world.svg'
        //     });
        //   }
        // });
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );

    this.profileService.getUserMinimalContributions(this.username).subscribe(
      (res: any) => {
        console.log(res);
        this.userIdeas = res.user[0].ideasByOwner;
        this.userProjects = res.user[0].projectsByowner;
      },
      (err: any) => {
        this.errorHandler.subj_notification.next(err);
      }
    );
  }

  openDialog(idea: any): void {
    const dialogRef = this.dialog.open(IdeaCardComponent, {
      width: 'auto',
      data: { idea }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  fetchContributions(context: string) {
    this.username = this.router.url.split('/')[2];
    this.profileService.getUserDetailedContributions(this.username, context).subscribe(
      (res: any) => {
        if (context === 'projects' || context === 'project') {
          this.userProjects = res.user[0].projectsByowner;
        } else {
          this.userIdeas = res.user[0].ideasByOwner;
        }
      },
      (err: any) => {
        this.errorHandler.subj_notification.next(err);
      }
    );
  }

  toggleFormFields(toggle: boolean) {
    this.isFieldEditable = toggle;
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.updateUserData();
    } else {
      this.profileService.uploadImage(this.selectedFile.file).subscribe(
        (res: any) => {
          const profileUrl = 'v' + res.version + '/' + res.public_id + '.' + res.format;
          this.updateUserData(profileUrl);
        },
        (err: any) => {
          this.errorHandler.subj_notification.next(err);
        }
      );
    }
  }

  updateUserData(profileUrl?: string) {
    const userUpdateObject = {
      username: this.editForm.get('username').value,
      bio: this.editForm.get('bio').value,
      location: this.editForm.get('location').value,
      technologies: this.listOfTech,
      date_of_birth: this.editForm.get('dob').value,
      website: this.editForm.get('website').value,
      profile_pic: profileUrl
    };
    const trimmedUserChangeObject = {};
    Object.keys(userUpdateObject).forEach(key => {
      if (userUpdateObject[key] || (key === 'technologies' && userUpdateObject[key].length === 0)) {
        trimmedUserChangeObject[key] = userUpdateObject[key];
      }
    });
    this.profileService
      .UpdateUserDetails(trimmedUserChangeObject)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.data.update_user.returning[0].username !== localStorage.getItem('username')) {
            localStorage.setItem('username', data.data.update_user.returning[0].username);
            const newUsername = '/user/' + localStorage.getItem('username');
            this.router.navigate([newUsername]);
          }
          location.reload();
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.listOfTech.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  remove(tech: string): void {
    const index = this.listOfTech.indexOf(tech);
    if (index >= 0) {
      this.listOfTech.splice(index, 1);
    }
  }

  fetchUserContributions() {
    this.profileService
      .getUserContributions()
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          this.user.idea_list = data.idea_list;
          this.user.project_list = data.project_list;
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
}
