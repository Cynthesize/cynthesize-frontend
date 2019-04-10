import { Component, OnInit, Input } from '@angular/core';
import { SocialDialogComponent } from '../../details/details.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() previousDetails = {};
  sociallinks: any = [];

  constructor(private dialog: MatDialog) {}

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

  submitUserUpdateForm() {
    console.log('called');
  }
}
