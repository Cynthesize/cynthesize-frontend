import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit {
  @Input() ideaName: string;
  @Input() description: string;
  @Input() likes: string;
  @Input() owner: string;
  @Input() timestamp: string;

  constructor() { }

  ngOnInit() {
  }

}
