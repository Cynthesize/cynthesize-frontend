import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.scss']
})
export class ViewIdeaComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('This project');
  }

}
