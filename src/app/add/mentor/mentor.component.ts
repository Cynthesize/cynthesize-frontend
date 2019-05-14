import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '@app/core/user/user.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { AuthenticationService } from '@app/core';
import { Title } from '@angular/platform-browser';

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
  isApplying = false;
  errorMessage = '';

  levels = new FormControl();

  mentorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authenticationService: AuthenticationService,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) {
    this.userService.checkMentorshipData().subscribe(
      (data: any) => {
        if (data.data.mentor_data.length !== 0) {
          this.isAlreadyApplied = true;
        }
      },
      (error: any) => {
        // Nothing is done if user is not logged in.
      }
    );
    this.isLoading = false;
    this.title.setTitle('Cynthesize | Become a mentor');
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
    this.isApplying = true;
    const mentorData = formData;
    mentorData['levels'] = this.levels.value;
    console.log(mentorData);
    if (mentorData.vc.trim() === '' || mentorData.aim.trim() === '' || mentorData.levels.length === 0) {
      this.errorMessage = 'Please answer all the fields.';
      this.isApplying = false;
    } else {
      this.errorMessage = '';
      this.userService.applyForMentorship(mentorData).subscribe(
        (data: any) => {
          this.isApplying = false;
          this.errorHandler.subj_notification.next(
            'You have succesfully applied for mentorship. Please wait for a while.'
          );
          this.isAlreadyApplied = true;
        },
        (error: any) => {
          this.isApplying = false;
          this.errorHandler.subj_notification.next(error);
        }
      );
    }
  }
}
