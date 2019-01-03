import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueComponent implements OnInit {
  activeCheckpoint: string;
  project: Observable<any>;
  issues: Observable<any>;
  checkpointList = {};
  sub: any;
  public editorContent = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore facilis similique
  odit aliquid eligendi laboriosam repudiandae quam veritatis, harum officia, ratione neque quas natus quibusdam alias
  hic, id libero doloribus! Lorem
  ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsa nostrum odio est ea, nulla pariatur. Laudantium
  totam eius repudiandae iste, saepe illum commodi quidem suscipit architecto aspernatur, quibusdam labore.`;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const term = params['issueName'];
      this.getProject(term);
      return term;
    });
  }

  getProject(routeParam: string) {
    const checkpointName = routeParam;
    this.projectService
      .getProject(this.router.url.split('/')[2])
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data === {}) {
            // this.router.navigate(['not-found']);
          }
          this.project = data;
          this.checkpointList = this._getCheckpointData(data['area_of_issues_open'][0]);
          Object.keys(this.checkpointList).forEach(checkpoint => {
            if (checkpoint === checkpointName) {
              let idList = '';
              data['area_of_issues_open'][0][checkpointName].forEach((id: any) => {
                idList += id;
              });
              this.projectService
                .fetchIdea(idList)
                .pipe(finalize(() => {}))
                .subscribe(
                  (issueObject: any) => {
                    this.issues = issueObject;
                  },
                  (error: any) => {
                    console.log(error);
                  }
                );
            }
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  _getCheckpointData(recievedObject: Object) {
    const _tempObject = {};
    Object.keys(recievedObject).forEach(checkpoint => {
      if (recievedObject[checkpoint].length > 0) {
        _tempObject[checkpoint] = recievedObject[checkpoint].length;
      }
    });
    return _tempObject;
  }

  getPageName() {
    return this.router.url.split('/')[4] || 'Home';
  }

  initAddIssueDialogue() {
    console.log('Modal init');
  }
}
