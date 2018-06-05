import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NewsfeedService } from '../../services/newsfeed.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { VotingService } from '../../services/project/voting.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  public userUpvoteData;
  public userDownvoteData;

  constructor(public page: NewsfeedService,
    public votingService: VotingService,
    public authService: AuthService,
    private router: Router,
    private localService: LocalStorageService,
  ) { }

  user_uid = this.localService.get('userUid');

  ngOnInit() {
    this.page.init('projects', 'project_name', { reverse: false, prepend: false });
    if(this.localService.get('isLoggedIn')) {
      this.votingService.getUserUpvotedProjectList(this.localService.get('userUid')).subscribe(userData => {
        if (userData) {
          this.userUpvoteData = userData;          
        } else {
          this.userUpvoteData = {};
        }
      }); 
      this.votingService.getUserDownvotedProjectList(this.localService.get('userUid')).subscribe(userData => {
        if (userData) {
          this.userDownvoteData = userData;          
        } else {
          this.userDownvoteData = {};
        }
      }); 
    }   
  }

  onScroll() {
    this.page.more();
  }

  upvote(e) {
    if(!this.localService.get('isLoggedIn')) {
      this.router.navigate(['login']);
    } else {     
      var project_id = e.target.name;
      this.votingService.upvoteProject(project_id, this.user_uid);
    }
  }

  downvote(e) {
    if(!this.localService.get('isLoggedIn')) {
      this.router.navigate(['login']);
    } else {     
      var project_id = e.target.name;
      this.votingService.upvoteProject(project_id, this.user_uid);
    }
  }

  neutralizeUpvote(e) {
    var project_id = e.target.name;
    this.votingService.neutralizeUpvote(project_id, this.localService.get('userUid'))
  }

  neutralizeDownvote(e) {
    var project_id = e.target.name;
    this.votingService.neutralizeDownvote(project_id, this.localService.get('userUid'))
  }
}
