import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ShareSheetComponent } from '@app/shared/share-sheet/share-sheet.component';
import { ProjectService } from '@app/core/project/project.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-launched-products',
  templateUrl: './launched-products.component.html',
  styleUrls: ['./launched-products.component.scss']
})
export class LaunchedProductsComponent implements OnInit {
  length = -1;
  currentCount = 0;
  projectList: any[] = [];
  activeContext = 'newest';
  isLoading = true;
  constructor(
    private bottomSheet: MatBottomSheet,
    private projectService: ProjectService,
    private errorHandler: ErrorHandlerService
  ) {
    this.errorHandler.ideaWindowScrolled.subscribe(message => {
      if (this.length >= this.projectList.length && message === 'fetchLaunchedProjects') {
        this.isLoading = true;
        this.getlaunchedProjectsFromServer(4, this.currentCount, this.activeContext);
      }
    });
  }

  ngOnInit() {
    this.projectService.getTotalLaunchedProjectsCount().subscribe(data => {
      this.length = data.data.launched_projects_aggregate.aggregate.count;
    });
    this.getlaunchedProjectsFromServer(6, this.currentCount, this.activeContext);
  }

  openShareSheet(): void {
    this.bottomSheet.open(ShareSheetComponent, {
      data: {
        facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
        twitterUrl: 'https://twitter.com/home?status=',
        linkedInUrl: 'https://www.linkedin.com/shareArticle?mini=true&url=&title=&summary=&source='
      }
    });
  }

  getlaunchedProjectsFromServer(number: number, offset: number, context: any) {
    this.projectService.getNProjects(number, offset, context).subscribe(data => {
      this.currentCount += data.data.launched_projects.length;
      this.projectList.push(...data.data.launched_projects);
      this.isLoading = false;
    });
  }
  changeContext(context: string) {
    this.activeContext = context;
    this.projectList = [];
    this.currentCount = 0;
  }
}
