import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaginationData } from 'src/app/models/pagination.interface';
import { ProjectRequest } from 'src/app/models/project-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectRequestService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectRequest[]> {
    return this.http.get<ProjectRequest[]>('/backend/project-request');
  }

  findAll(page: number, limit: number): Observable<PaginationData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get('/backend/project-request', {params}).pipe(
      map((projectRequestData: PaginationData | any) => projectRequestData),
      catchError(err => throwError(err))
    )
  }

  submitProjectRequest(projectRequest: ProjectRequest) {
    return this.http.post<ProjectRequest>('/backend/project-request', projectRequest);
  }

}
