import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '@app/core/profile/profile.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  username: string;
  launchedProjects: any[] = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private profileService: ProfileService) {
    this.route.params.subscribe(params => {
      this.profileService.getUserProjects(params.username).subscribe(data => {
        this.launchedProjects = data.data.user[0].launchedProjectssByowner;
        this.isLoading = false;
      });
    });
  }

  ngOnInit() {}
}
