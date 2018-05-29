import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NewsfeedService } from '../../services/newsfeed.service';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  constructor(public page: NewsfeedService) {}

  ngOnInit() {
    this.page.init('projects', 'project_name', { reverse: false, prepend: false })
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more()
    }
  }
}
