import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss']
})
export class ProjectProgressComponent implements OnInit {
  @Input() currentStage = '';
  completedStages = {
    ideation_stage: false,
    prototype_development_stage: false,
    consumer_feedback_stage: false,
    launching_stage: false,
    funding_stage: false
  };
  constructor() {}

  ngOnInit() {
    for (let index = 0; index < Object.keys(this.completedStages).length; index++) {
      const stage = Object.keys(this.completedStages)[index];
      if (stage === this.currentStage) {
        break;
      } else {
        this.completedStages[stage] = true;
      }
    }
  }
}
