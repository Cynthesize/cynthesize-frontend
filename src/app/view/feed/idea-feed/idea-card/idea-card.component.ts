import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.scss']
})
export class IdeaCardComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() upvotes: number;

  constructor() {}

  ngOnInit() {}
}
