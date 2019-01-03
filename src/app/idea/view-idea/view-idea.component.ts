import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  idea: Observable<any>;
  id: Observable<string>;
  isLoading = false;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private ideaService: IdeaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getIdea();
    this.title.setTitle('This project');
  }

  getIdea() {
    const routeParam = this.activatedRoute.params.pipe(
      switchMap(params => {
        return params.get();
      })
    );
    this.ideaService
      .getIdea(routeParam.source['_value'].id)
      .pipe(finalize(() => {}))
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.router.navigate(['not-found']);
          }
          this.idea = data[0];
          console.log(this.idea);
          this.isLoading = true;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
