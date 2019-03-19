import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-launched-products',
  templateUrl: './launched-products.component.html',
  styleUrls: ['./launched-products.component.scss']
})
export class LaunchedProductsComponent implements OnInit {
  length = -1;
  currentCount = 0;
  projectList: any[] = [];
  activeContext = 'default';
  isLoading = true;
  constructor() {}

  ngOnInit() {}

  changeContext(context: string) {
    this.activeContext = context;
    this.projectList = [];
    this.currentCount = 0;
  }
}
