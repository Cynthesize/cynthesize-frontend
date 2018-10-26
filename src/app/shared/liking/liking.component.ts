import { Component, OnInit, Input } from '@angular/core';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-liking',
  templateUrl: './liking.component.html',
  styleUrls: ['./liking.component.scss']
})
export class LikingComponent implements OnInit {
  @Input()
  ideaId: string;
  @Input()
  likes: number;

  liked = false;

  constructor(
    private ideaService: IdeaService,
    public authenticationService: AuthenticationService
  ) { }

  isLiked() {
    if (this.liked === true) {
      return 'primary';
    }
    return;
  }

  like(ideaId: string) {
    this.liked = true;
    this.ideaService
      .likeIdea('1')
      .pipe(
        finalize(() => {})
      )
      .subscribe(
        (data: any) => {},
        (error: any) => {
          this.liked = false;
          console.log(error);
        }
      );
  }
  ngOnInit() {
  }


}
