import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentsComponent } from './comments/comments.component';
import { SimplemdeModule } from 'ngx-simplemde';
import { EditableCommentComponent } from './comments/editable-comment/editable-comment.component';
import { FormsModule } from '@angular/forms';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { RouterModule } from '@angular/router';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { LikeComponent } from './like/like.component';
import { ShareSheetComponent } from './share-sheet/share-sheet.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material';
import { ActivityActionsComponent } from './activity-actions/activity-actions.component';
import { UserNameComponent } from './user-name/user-name.component';
import { UnauthorisedComponent } from './unauthorized/unauthorized.component';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = {
  cloud_name: 'cynthesize',
  upload_preset: 'qdninpjl'
};
@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    CommonModule,
    SimplemdeModule.forRoot(),
    FormsModule,
    CovalentTextEditorModule,
    MatBottomSheetModule,
    CovalentMarkdownModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  declarations: [
    NotFoundComponent,
    UnauthorisedComponent,
    CommentsComponent,
    EditableCommentComponent,
    TimeDiffPipe,
    LikeComponent,
    ShareSheetComponent,
    ActivityActionsComponent,
    UserNameComponent
  ],
  exports: [
    LikeComponent,
    CommentsComponent,
    ShareSheetComponent,
    ActivityActionsComponent,
    TimeDiffPipe,
    UserNameComponent
  ],
  entryComponents: [ShareSheetComponent],
  providers: [{ provide: MatBottomSheetRef, useValue: {} }, { provide: MAT_BOTTOM_SHEET_DATA, useValue: [] }]
})
export class SharedModule {}
