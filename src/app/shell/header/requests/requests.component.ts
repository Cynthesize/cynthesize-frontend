import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '@app/core/user/user.service';
import { ErrorHandlerService } from '@app/core/error-handler.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  reqForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    public dialogRef: MatDialogRef<RequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.reqForm = this.fb.group({
      is_bug: [false, Validators.required],
      text: ['', Validators.required]
    });
  }

  submitRequest() {
    this.userService.sendReq(this.reqForm.value).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.errorHandler.subj_notification.next('Request Sent!');
      },
      (error: any) => {
        this.errorHandler.subj_notification.next(error);
      }
    );
  }
}
