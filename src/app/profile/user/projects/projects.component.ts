import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@app/core/profile/profile.service';
import { ProjectService } from '@app/core/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  username: string;
  launchedProjects: any[] = [];
  isLoading = true;
  nullText: string = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    public projectService: ProjectService
  ) {
    this.route.params.subscribe(params => {
      this.profileService.getUserProjects(params.username).subscribe(data => {
        this.launchedProjects = data.data.user[0].projects;
        if (this.launchedProjects.length === 0) {
          this.nullText = 'No projects exists.';
        }
        this.isLoading = false;
      });
    });
  }

  ngOnInit() {}
}
