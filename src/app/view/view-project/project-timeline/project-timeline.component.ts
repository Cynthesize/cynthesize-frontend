import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss']
})
export class ProjectTimelineComponent implements OnInit {
  @Input() timeline: any;
  @Input() projectId: number;

  addingTimelineEvent = false;
  timelineDataForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {}

  initAddTimelineEvent() {
    this.timelineDataForm = this.formBuilder.group({
      eventName: [''],
      date: [Date.now()]
    });
    this.addingTimelineEvent = true;
  }

  addTimelineEvent() {
    this.timeline[this.timelineDataForm.get('eventName').value] = this.timelineDataForm.get('date').value;
    this.projectService.updateProjectEvents({ timeline: this.timeline }, this.projectId).subscribe(
      (data: any) => {
        this.timelineDataForm.get('eventName').setValue('');
        this.addingTimelineEvent = false;
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
