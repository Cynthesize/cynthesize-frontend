import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueComponent implements OnInit {
  public editorContent: string = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore facilis similique odit aliquid eligendi laboriosam
  repudiandae quam veritatis, harum officia, ratione neque quas natus quibusdam alias hic, id libero doloribus! Lorem
  ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsa nostrum odio est ea, nulla pariatur. Laudantium
  totam eius repudiandae iste, saepe illum commodi quidem suscipit architecto aspernatur, quibusdam labore.`;
  constructor() {}

  ngOnInit() {}
}
