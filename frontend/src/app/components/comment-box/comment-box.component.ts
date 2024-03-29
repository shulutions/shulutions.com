import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input() projectRequestId?: number
  @Output() onComment: EventEmitter<any> = new EventEmitter();
  
  comment: string = '';

  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(null, [Validators.required]),
  });

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.commentForm.invalid) return;
    if (!this.projectRequestId) return;
    await this.projectRequestService.comment(this.projectRequestId, this.commentForm.value).subscribe(
      (comment: any) => {
        this.onComment.emit(comment);
      }
    );
    this.commentForm.get('comment')?.setValue('');
  }
}
