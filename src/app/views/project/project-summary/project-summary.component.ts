import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

export interface project {
  owner: string;
  project_name: string;
  one_line_description: string;
  project_summary: string;
  is_public: Boolean;
  uploaded_files: number;
  uploads_size: number;
  tags: Array<any>;
  comments: Object;
  upvotes: Number;
  downvotes: Number;
  date_created: string;
}

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectSummaryComponent implements OnInit {
  projectDetail: project;
  editState: boolean = false;
  taskToEdit: project;

  constructor(public taskService: ProjectDetailService,
    private route: ActivatedRoute,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskService.getTasks(params['id']).subscribe(tasks => {
        this.projectDetail = tasks;
      });
    });
  }
}
