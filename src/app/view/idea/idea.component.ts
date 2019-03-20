import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IdeaService } from '@app/core/idea/idea.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {
  idea: any;

  constructor(
    public dialogRef: MatDialogRef<IdeaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private ideaService: IdeaService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.ideaService.getIdea(this.data).subscribe(data => {
      this.idea = data.data.ideas[0];
    });
  }
}
