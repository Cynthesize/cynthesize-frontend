import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-project-progress',
  templateUrl: './project-progress.component.html',
  styleUrls: ['./project-progress.component.scss']
})
export class ProjectProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('line') private line: ElementRef;
  @ViewChild('accordion') private accordion: ElementRef;
  constructor() {}

  ngOnInit() {
    this.line.nativeElement.width = this.accordion.nativeElement.width;
    console.log(this.line, this.accordion);
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }
}
