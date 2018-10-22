import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Idea } from '@app/shared/idea';
import { IdeaService } from '@app/core/idea/idea.service';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.scss']
})
export class ViewIdeaComponent implements OnInit {
  idea: Observable<Idea>;
  id: Observable<string>;
  isLoading = false;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.getIdea();
    this.title.setTitle('This project');
  }

  getIdea() {
    this.id = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log(params.get('id'));
        return(params.get('id'));
      }
    ));
    console.log(this.id);
    
    this.ideaService.getIdea('1')
      .pipe(
        finalize(() => {
          console.log('loaded');
        })
      )
      .subscribe((data: any) => {
        this.idea = data[0];
        this.isLoading = true;
        console.log(this.idea);
      }, (error: any) => {
        console.log(error);
      });
  }

}
