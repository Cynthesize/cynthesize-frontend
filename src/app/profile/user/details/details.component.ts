import { ProfileService } from '@app/core/profile/profile.service';
import { IdeaService } from '@app/core/idea/idea.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { User } from '@app/core/profile/user';
import {
  MatChipInputEvent,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatDialog } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { ConfirmComponent } from '@app/shared/confirm/confirm.component';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

export interface SocialLinks {
  website: string;
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
  username: string;
  sociallinks: any = [];
  isFieldEditable = false;
  socialLinks: any;
  isSameUser =
    localStorage.getItem('username') === this.router.url.split('/')[2];

  isPageLoaded = false;
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
    private ideaService: IdeaService,
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
        this.isPageLoaded = true;
        this.user = data.user[0];
        this.listOfTech = data.user[0].technologies || [];
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );

    this.profileService.getUserMinimalContributions(this.username).subscribe(
      (res: any) => {
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

  openConfirmDialog(idea: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      data: { idea }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data == true) this.deleteIdea(idea.id);
    });
  }

  openSocialDialog(): void {
    const dialogRef = this.dialog.open(SocialDialogComponent, {
      width: 'auto',
      data: this.user.social_links
    });
    dialogRef.afterClosed().subscribe(result => {
      this.socialLinks = result;
    });
  }

  fetchContributions(context: string) {
    this.username = this.router.url.split('/')[2];
    this.profileService
      .getUserDetailedContributions(this.username, context)
      .subscribe(
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
          const profileUrl =
            'v' + res.version + '/' + res.public_id + '.' + res.format;
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
      profile_pic: profileUrl,
      social_links: this.socialLinks
    };
    console.log(userUpdateObject);
    const trimmedUserChangeObject = {};
    Object.keys(userUpdateObject).forEach(key => {
      if (
        userUpdateObject[key] ||
        (key === 'technologies' && userUpdateObject[key].length === 0)
      ) {
        trimmedUserChangeObject[key] = userUpdateObject[key];
      }
    });
    this.profileService
      .UpdateUserDetails(trimmedUserChangeObject)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (
            data.data.update_user.returning[0].username !==
            localStorage.getItem('username')
          ) {
            localStorage.setItem(
              'username',
              data.data.update_user.returning[0].username
            );
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

  deleteIdea(id: any) {
    this.ideaService.deleteIdea(id).subscribe(data => {
      this.userIdeas = this.userIdeas.filter((obj: any) => {
        return obj.id != data.data.delete_ideas.returning[0].id;
      });
    });
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

@Component({
  selector: 'app-social-dialog',
  templateUrl: './social-dialog.component.html',
  styleUrls: ['./social-dialog.component.scss']
})
export class SocialDialogComponent {
  socialLinks: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SocialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
