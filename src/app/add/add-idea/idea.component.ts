import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { IdeaService } from '@app/core/idea/idea.service';
import { Logger } from '@app/core';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@app/core/error-handler.service';

export interface Tags {
  name: string;
}

const log = new Logger('Idea');

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class AddIdeaComponent implements OnInit {
  version: string = environment.version;
  error: string;
  addIdeaForm: FormGroup;
  isLoading = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tags[] = [{ name: 'Artificial Intelligence' }, { name: 'Robotics' }, { name: 'Web Application' }];

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService,
    private errorHandler: ErrorHandlerService
  ) {
    this.createForm();
  }

  addIdea() {
    this.isLoading = true;
    this.ideaService
      .addIdea(this.addIdeaForm.value)
      .pipe(
        finalize(() => {
          this.addIdeaForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          log.debug(`Idea Added`);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.errorHandler.subj_notification.next(error);
        }
      );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tags: Tags): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit() {}
  private createForm() {
    this.isLoading = false;
    this.addIdeaForm = this.formBuilder.group({
      idea_name: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''],
      require_assistance: true
    });
  }
}
