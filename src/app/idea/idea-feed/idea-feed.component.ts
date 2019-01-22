import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-idea-feed',
  templateUrl: './idea-feed.component.html',
  styleUrls: ['./idea-feed.component.scss']
})
export class IdeaFeedComponent implements OnInit {
  length: number;
  ideaList: any;
  constructor(private ideaService: IdeaService) {}

  ngOnInit() {
    this.ideaService.getTotalIdeaCount().subscribe(data => {
      this.length = data.data.ideas_aggregate.aggregate.count;
    });
    this.getIdeasFromServer({ pageSize: 5, pageIndex: 0 });
  }

  getIdeasFromServer(event: any) {
    this.ideaService.getNIdeas(event.pageSize, event.pageIndex).subscribe(data => {
      this.ideaList = data.data.ideas;
    });
  }
}
