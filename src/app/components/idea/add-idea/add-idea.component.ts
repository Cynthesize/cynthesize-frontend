import { Component, OnInit } from '@angular/core';
import { Idea } from '../../../models/idea';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { IdeaService } from '../../../services/idea.service';
import { LocalStorageModule } from 'angular-2-local-storage';

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

  onIdeaSubmit(): void {
    this.ideaInstance.idea_name = this.ideaFormGroup.get('idea_name').value;
    this.ideaInstance.description = this.ideaFormGroup.get('description').value;
    this.ideaInstance.require_assistance = this.ideaFormGroup.get('require_assistance').value;
    this.ideaInstance.ownerToken = localStorage.getItem('token');
    this.ideaService.addIdea(this.ideaInstance)
      .then((Response) => {
        console.log(Response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.ideaFormGroup = this.fb.group({
      idea_name: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
      ]],
      require_assistance: ['']
    });
  }


  get ideaName() {
    return this.ideaFormGroup.get('idea_name');
  }

  get ideaDescription() {
    return this.ideaFormGroup.get('description');
  }

  get require_assistance() {
    return this.ideaFormGroup.get('require_assistance');
  }

}
