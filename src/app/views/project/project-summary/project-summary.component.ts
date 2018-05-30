import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProjectDetailService } from '../../../services/project/project-detail.service';
import { Observable } from '@firebase/util';


@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {
  public id;
  public projectDetails;
  constructor(private route: ActivatedRoute,
    private db:AngularFirestore,
    public projectDetail: ProjectDetailService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.db.collection("projects").doc( "project1527582960119").ref
    .onSnapshot(function(doc) {
      this.projectDetails = doc.data();
      console.log(this.projectDetails);
    });
  }

}
