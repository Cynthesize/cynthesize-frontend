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
  constructor(public page: NewsfeedService,
    public votingService: VotingService,
    public authService: AuthService,
    private router: Router,
    private localService: LocalStorageService,
  ) { }

  user_uid = this.localService.get('userUid');
  ngOnInit() {
    this.page.init('projects', 'project_name', { reverse: false, prepend: false });
  }

  onScroll() {
    this.page.more();
  }

  public hasVoted(project_id) {
    console.log(project_id);
    
    // this.votingService.getUserVotedProjectList(this.user_uid).forEach(project => {
    //   if (project_id === project) {
    //     return 0;
    //   }
    // });
    // return 1;
  }

  upvote(e) {
    e.target.disable = true;
    if(!this.localService.get('isLoggedIn')) {
      this.router.navigate(['login']);
    } else {     
      var project_id = e.target.name;
      console.log(this.user_uid);
      
      this.votingService.upvoteProject(project_id, this.user_uid);
    }
  }
  downvote(e) {
    var project_id = e.target.name;    
    if(this.votingService.downvoteProject(project_id)){
      e.target.value++;
    } else {
      e.target.value = "Failed";
    }
  }
}
