import { Component, OnInit } from '@angular/core';
import { VotingService } from '../../../../services/project/voting.service';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {

  constructor(private votingService: VotingService) { }

  ngOnInit() {
  }

  upvote(e) {
    e.target.disabled = true;
    
  }
}
