import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@app/core/profile/profile.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  username: string;
  launchedProjects: any[] = [];
  ongoingProjects: any[] = [];
  isLoading = true;

  constructor(private router: Router, private profileService: ProfileService) {
    this.username = this.router.url.split('/')[2];
  }

  ngOnInit() {
    this.getUserProjectsContributions();
  }

  getUserProjectsContributions() {
    this.profileService.getUserProjects(this.router.url.split('/')[2]).subscribe(data => {
      this.launchedProjects = data.data.user[0].launchedProjectssByowner;
      this.ongoingProjects = data.data.user[0].projectssByowner;
      this.isLoading = false;
    });
  }
}
