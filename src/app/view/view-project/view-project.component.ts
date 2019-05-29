import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/core/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '@app/shared/objects';
import { MatDialog } from '@angular/material';
import { AddIssueComponent } from './issue/issue.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  project: Observable<Project>;
  editingDescription = false;
  selectedDate: Date;
  projectName = '';
  isMobile = false;
  issueActive = false;
  isSameUser: boolean;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.route.params.subscribe(params => {
      this.projectService.getProject(params.id.split('-')[0], params.id.slice(params.id.indexOf('-') + 1)).subscribe(
        (data: any) => {
          this.project = data;
          if (!this.project) {
            this.router.navigate(['/not-found']);
          }
          this.projectName = this.projectService.displayableName(this.project['project_name']);
          this.title.setTitle('Cynthesize | ' + this.projectName);
          this.editingDescription = true;
          this.isSameUser = data.user.username === localStorage.getItem('username');
        },
        (error: any) => {
          this.router.navigate(['unauthorized']);
        }
      );
    });
    setInterval(() => {
      this.checkRoute();
    }, 1000);
  }

  ngOnInit() {
    this.checkRoute();
  }

  checkRoute() {
    if (this.project) {
      this.issueActive = this.router.url === '/view/project/' + this.project['id'] + '-' + this.project['project_name'];
    }
  }

  /*
  fnc(selectedDate: Date) {
    const dates = document.getElementsByClassName('mat-calendar-body-cell-content');
    for (let index = 0; index < dates.length; index++) {
      // Update this according to your needs @neil.
      dates[index]['style']['backgroundColor'] = '#' + (index * 6 + 4000);
    }
  }*/

  openAddIssueDialog(): void {
    this.dialog.open(AddIssueComponent, {
      width: '900px'
    });
  }
}
