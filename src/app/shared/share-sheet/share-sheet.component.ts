import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-share-sheet',
  templateUrl: './share-sheet.component.html',
  styleUrls: ['./share-sheet.component.scss']
})
export class ShareSheetComponent implements OnInit {
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ShareSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.facebookUrl = data.facebookUrl || null;
    this.twitterUrl = data.twitterUrl || null;
    this.linkedInUrl = data.linkedInUrl || null;
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit() {}
}
