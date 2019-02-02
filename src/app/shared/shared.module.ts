import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LikingComponent } from './liking/liking.component';
import { CommentsComponent } from './comments/comments.component';
import { SimplemdeModule } from 'ngx-simplemde';
import { EditableDirective } from './editable.directive';
import { EditableCommentComponent } from './comments/editable-comment/editable-comment.component';
import { FormsModule } from '@angular/forms';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { RouterModule } from '@angular/router';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';

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
    CovalentMarkdownModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ],
  declarations: [
    LoaderComponent,
    NotFoundComponent,
    LikingComponent,
    CommentsComponent,
    EditableDirective,
    EditableCommentComponent,
    TimeDiffPipe
  ],
  exports: [LoaderComponent, LikingComponent, CommentsComponent]
})
export class SharedModule {}
