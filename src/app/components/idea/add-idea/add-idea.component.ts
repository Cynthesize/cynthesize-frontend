import { Component, OnInit } from '@angular/core';
import { Idea } from '../../../models/idea';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { IdeaService } from '../../../services/idea.service';

@Component({
  selector: 'app-add-idea',
  templateUrl: './add-idea.component.html',
  styleUrls: ['./add-idea.component.css']
})
export class AddIdeaComponent implements OnInit {

  ideaInstance: Idea = new Idea;
  ideaFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ideaService: IdeaService) { }

  // onIdeaSubmit(): void {
  //   this.ideaService.addIdea(this.ideaInstance);
  // }

  ngOnInit() {
  }

  getIdeaName() {
    return this.ideaFormGroup.get('ideaName');
  }

  getIdeaDescription() {
    return this.ideaFormGroup.get('ideaDescription');
  }

}
