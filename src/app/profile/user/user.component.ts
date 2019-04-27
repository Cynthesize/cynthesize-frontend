import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/profile/user';
import { FormGroup, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ProfileService } from '@app/core/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Param } from 'cloudinary-core';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

export interface SocialLinks {
  website: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userProjects: Array<Object>;
  user: User;
  isPageLoaded = false;
  username: string;
  sociallinks: any = [];
  isFieldEditable = false;
  socialLinks: any;
  isSameUser: boolean;

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
    this.route.params.subscribe((param: Param) => {
      this.username = param['username'];
      this.isSameUser = param['username'] === localStorage.getItem('username');
      this.profileService.getUserDetails(param['username']).subscribe(
        (data: any) => {
          if (data.user.length === 0) {
            this.router.navigate(['not-found']);
          }
          this.isPageLoaded = true;
          this.user = data.user[0];
          this.listOfTech = data.user[0].technologies || [];
          this.editForm = new FormGroup({
            username: new FormControl(this.user.username),
            bio: new FormControl(this.user.bio),
            location: new FormControl(this.user['location']),
            website: new FormControl(this.user['website'])
          });
        },
        (error: any) => {
          this.errorHandler.subj_notification.next(error);
        }
      );
    });
  }

  ngOnInit() {}

  toggleFormFields(toggle: boolean) {
    this.isFieldEditable = toggle;
  }

  checkRoute() {
    const thisRoute = this.router.url.split('/')[3];
    if (thisRoute) {
      return false;
    } else {
      return true;
    }
  }

  // onSubmit() {
  //   if (!this.selectedFile) {
  //     this.updateUserData();
  //   } else {
  //     this.profileService.uploadImage(this.selectedFile.file).subscribe(
  //       (res: any) => {
  //         const profileUrl = 'v' + res.version + '/' + res.public_id + '.' + res.format;
  //         this.updateUserData(profileUrl);
  //       },
  //       (err: any) => {
  //         this.errorHandler.subj_notification.next(err);
  //       }
  //     );
  //   }
  // }

  updateUserData(e: Event) {
    e.preventDefault();
    const userUpdateObject = {
      username: this.editForm.get('username').value,
      bio: this.editForm.get('bio').value,
      location: this.editForm.get('location').value,
      website: this.editForm.get('website').value
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
}
