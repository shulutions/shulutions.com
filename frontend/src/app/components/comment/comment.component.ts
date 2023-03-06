import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectRequestComment } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment?: ProjectRequestComment
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(private projectRequestService: ProjectRequestService) { }

  ngOnInit(): void {
  }

  deleteComment() {
    if (!this.comment?.id) return;
    this.projectRequestService.deleteComment(this.comment.id).subscribe(
      (comment: any) => {
        this.onDelete.emit(comment);
      }
    );
  }

}