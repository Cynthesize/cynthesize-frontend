import { ProfileService } from '@app/core/profile/profile.service';
import { IdeaService } from '@app/core/idea/idea.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { User } from '@app/core/profile/user';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MatDialog } from '@angular/material';
import { IdeaCardComponent } from '@app/shared/idea-card/idea-card.component';
import { Param } from 'cloudinary-core';

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
  @Input() user: any;

  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'app-social-dialog',
  templateUrl: './social-dialog.component.html',
  styleUrls: ['./social-dialog.component.scss']
})
export class SocialDialogComponent {
  socialLinks: FormGroup;

  constructor(public dialogRef: MatDialogRef<SocialDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
