import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';
import { ProjectRequestService } from 'src/app/services/project-request-service/project-request.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  dataSource?: PaginationData<ProjectRequest>;
  projectRequests?: ProjectRequest[];
  itemsPerPage = 200;
  currentPage = 1;
  
  constructor(private projectRequestService: ProjectRequestService,) { }

  ngOnInit(): void {
    this.getProjectRequests(null);
  }

  getProjectRequests(event: any) {
    this.projectRequestService.findAll(this.currentPage, this.itemsPerPage).pipe(
      //tap(projectRequests => console.log(projectRequests)),
      map((paginationData: PaginationData<ProjectRequest>) => {
        this.dataSource = paginationData
        // Sort the project requests by the number of reactions
        this.projectRequests = paginationData.items.sort((a: ProjectRequest, b: ProjectRequest) => {
          return (b.reactionTotal || 0) - (a.reactionTotal || 0)
        })
      })
    ).subscribe();
  }

}
