import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '@app/core/user/user.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  levelList = {
    Ideation: 'ideation_stage',
    Marketing: 'marketing_stage',
    'Prototype Development': 'product_development_stage',
    'Launching and Testing': 'launching_stage',
    'Consumer Analysis': 'consumer_feedback_stage',
    Funding: 'funding_stage'
  };

  isAlreadyApplied = false;
  isLoading = true;

  levels = new FormControl();

  mentorForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private errorHandler: ErrorHandlerService) {
    this.userService.checkMentorshipData().subscribe(
      (data: any) => {
        if (data.data.mentor_data.length !== 0) {
          this.isAlreadyApplied = true;
        }
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
    this.isLoading = false;
  }

  ngOnInit() {
    this.mentorForm = this.fb.group({
      current_profession: ['', Validators.required],
      experience: ['', Validators.required],
      aim: ['', Validators.required],
      potential_investment: ['', Validators.required],
      vc: ['', Validators.required]
    });
  }

  requestForMentorship(formData: any, e: Event) {
    e.preventDefault();
    this.isLoading = true;
    const mentorData = formData;
    mentorData['levels'] = this.levels.value;
    this.userService.applyForMentorship(mentorData).subscribe(
      (data: any) => {
        this.errorHandler.subj_notification.next(
          'You have succesfully applied for mentorship. Please wait while we look up your answers.'
        );
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
    this.isLoading = false;
  }
}
