import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

export interface Project {
  project_id: string;
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
  projectDetail: Project;
  project_id: string;
  editState = false;
  taskToEdit: Project;
  currentUser: any;
  videosArray: any[];

  constructor(public taskService: ProjectDetailService,
    private route: ActivatedRoute,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.project_id = params['id'];
      this.taskService.getTasks(this.project_id).subscribe(tasks => {
        this.projectDetail = tasks;
      });

      this.taskService.get_videos(this.project_id)
      .subscribe(videos => {
        this.videosArray = [];
        videos.forEach(video => {
          const x = video.payload.toJSON();
          x['$key'] = video.key;
          this.videosArray.push(x);
        });
      });

    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
      }
    });

  }
}
