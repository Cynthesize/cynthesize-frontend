import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NewsfeedService } from '../../services/newsfeed.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  projects = new BehaviorSubject([]);
  batch = 2         // size of each query
  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of database is reached
  constructor(private newsfeedService: NewsfeedService) { }

  ngOnInit() {
    this.getProjects()
  }

  onScroll () {
    console.log('scrolled!!')
    this.getProjects()
  }

  private getProjects(key?) {
    if (this.finished) return

    this.newsfeedService
        .getProjects(this.batch+1, this.lastKey)
        .do(projects => {

          /// set the lastKey in preparation for next query
          this.lastKey = _.last(projects)['$key']
          const newProjects = _.slice(projects, 0, this.batch)

          /// Get current movies in BehaviorSubject
          const currentProjects = this.projects.getValue()

          /// If data is identical, stop making queries
          if (this.lastKey == _.last(newProjects)['$key']) {
            this.finished = true
          }

          /// Concatenate new movies to current projects
          this.projects.next( _.concat(currentProjects, newProjects) )
        })
        .take(1)
        .subscribe()
  }
}
