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
  filteredTags: Observable<any[]>;
  tags: any[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  allTags = [
    {
      tag_name: 'Artificial Intelligence',
      tag_id: 1
    },
    {
      tag_name: 'Productivity',
      tag_id: 2
    },
    {
      tag_name: 'Home Automation',
      tag_id: 3
    },
    {
      tag_name: 'Internet of Things',
      tag_id: 4
    },
    {
      tag_name: 'Analytics',
      tag_id: 5
    },
    {
      tag_name: 'Web Application',
      tag_id: 6
    },
    {
      tag_name: 'Android',
      tag_id: 7
    },
    {
      tag_name: 'iOS',
      tag_id: 8
    },
    {
      tag_name: 'Blockchain',
      tag_id: 9
    },
    {
      tag_name: 'Health and Fitness',
      tag_id: 10
    },
    {
      tag_name: 'Social Media',
      tag_id: 11
    },
    {
      tag_name: 'Security',
      tag_id: 12
    },
    {
      tag_name: 'Robotics',
      tag_id: 13
    },
    {
      tag_name: 'Chat Messaging',
      tag_id: 14
    },
    {
      tag_name: 'Video Conferencing',
      tag_id: 15
    },
    {
      tag_name: 'Augmented Reality',
      tag_id: 16
    },
    {
      tag_name: 'VR',
      tag_id: 17
    },
    {
      tag_name: 'Dating',
      tag_id: 18
    },
    {
      tag_name: 'Music',
      tag_id: 19
    },
    {
      tag_name: 'Books',
      tag_id: 20
    }
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
      map((tag: any | null) => (tag ? this._filter(tag) : this.allTags.slice()))
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

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
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
        data => {
          this.ideaService.addIdeaTags(this.tags, data.data.insert_ideas.returning[0].id).subscribe((ret: any) => {
            this.isLoading = false;
            this.router.navigate(['/view/feed/ideas']);
          });
          log.debug(`Idea Added`);
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

  private _filter(value: any): any[] {
    let filterValue = value.tag_name || value;
    filterValue = filterValue.toLowerCase();

    return this.allTags.filter(tag => tag.tag_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
