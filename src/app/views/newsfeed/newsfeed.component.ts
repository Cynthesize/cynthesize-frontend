import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NewsfeedService } from '../../services/newsfeed.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  constructor(public page: NewsfeedService) { }

  ngOnInit() {
    this.page.init('projects', 'project_name', { reverse: false, prepend: false });
  }

  onScroll() {
    this.page.more();
  }
}
