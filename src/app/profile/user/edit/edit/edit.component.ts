import { Component, OnInit, Input } from '@angular/core';
import { SocialDialogComponent } from '../../details/details.component';
import { Router } from '@angular/router';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() previousDetails: {
    bio: '';
    date_of_birth: '';
    location: '';
    website: '';
    username: '';
    technologies: [];
  };
  sociallinks: any = [];
  listOfTech: any = [];

  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private dialog: MatDialog, private router: Router) {
    if (this.router.url.split('/')[2] !== localStorage.getItem('username')) {
      this.router.navigate(['/user', localStorage.getItem('username')]);
    }
  }

  ngOnInit() {}

  openSocialDialog(): void {
    const dialogRef = this.dialog.open(SocialDialogComponent, {
      width: 'auto',
      data: this.previousDetails['social_links']
    });
    dialogRef.afterClosed().subscribe(result => {
      this.sociallinks = result;
    });
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

  submitUserUpdateForm() {
    console.log('called');
  }
}
