import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Project } from '../models/project.interface';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>
    ) {}

    create(project: Project): Observable<Project> {
        return from(this.projectRepository.save(project));
    }

    findOne(id: number): Observable<Project> {
        return from(this.projectRepository.findOne({id})); 
    }

    findAll(): Observable<Project[]> {
        return from(this.projectRepository.find());
    }

    deleteOne(id: number): Observable<any> {
        return from(this.projectRepository.delete(id)); 
    }

    updateOne(id: number, project: Project): Observable<any> {
        return from(this.projectRepository.update(id, project));
    }
}
