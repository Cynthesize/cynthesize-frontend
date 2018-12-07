import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  project: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.project = this._formBuilder.group({
      projectName: ['', Validators.required],
      projectId: [''],
      description: ['', Validators.required],
      currentStage: ['', Validators.required]
    });
  }

  generateProjectId() {
    return this.project.get('projectName').value + Math.round(Date.now() / 1000000);
  }
}
