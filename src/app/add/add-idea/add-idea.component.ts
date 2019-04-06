import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { IdeaService } from '@app/core/idea/idea.service';
import { Logger } from '@app/core';
import { Router } from '@angular/router';
import { finalize, startWith, map } from 'rxjs/operators';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { Observable } from 'rxjs';

export interface Tags {
  tag_name: string;
}

const log = new Logger('Idea');

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.scss']
})
export class AddIdeaComponent implements OnInit {
  error: string;
  addIdeaForm: FormGroup;
  isLoading = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  allTags = [
    'Artificial Intelligence',
    'Productivity',
    'Home Automation',
    'Internet of Things',
    'Analytics',
    'Web Application',
    'Android',
    'iOS',
    'Blockchain',
    'Health and Fitness',
    'Social Media',
    'Security',
    'Robotics',
    'Chat Messaging',
    'Video Conferencing',
    'Augmented Reality',
    'VR',
    'Dating',
    'Music',
    'Books'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ideaService: IdeaService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
    this.createForm();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice()))
    );
  }
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  addIdea() {
    this.isLoading = true;
    this.addIdeaForm.value.idea_name = this.addIdeaForm.value.idea_name
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    this.addIdeaForm.value.description = this.addIdeaForm.value.description.replace(/\s+/g, ' ').trim();
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
          this.router.navigate(['/view/feed/ideas']);
        },
        error => {
          this.isLoading = false;
          this.errorHandler.subj_notification.next(error);
        }
      );
  }
  ngOnInit() {}
  private createForm() {
    this.isLoading = false;
    this.addIdeaForm = this.formBuilder.group({
      idea_name: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['']
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
