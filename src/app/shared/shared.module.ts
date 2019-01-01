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
import { MomentModule } from 'ngx-moment';
import { EditableCommentComponent } from './comments/editable-comment/editable-comment.component';
import { FormsModule } from '@angular/forms';
import { TimeDiffPipe } from './pipes/time-diff.pipe';
import { CovalentTextEditorModule } from '@covalent/text-editor';
import { CovalentMarkdownModule } from '@covalent/markdown';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    SimplemdeModule.forRoot(),
    MomentModule,
    FormsModule,
    CovalentTextEditorModule,
    CovalentMarkdownModule
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
