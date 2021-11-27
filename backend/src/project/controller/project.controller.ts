import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Project } from '../models/project.interface';
import { ProjectService } from '../service/project.service';

@Controller('projects')
export class ProjectController {

    constructor(private projectService: ProjectService) {}

    @Post()
    create(@Body()project: Project): Observable<Project> {
        return this.projectService.create(project);
    }

    @Get(':id')
    findOne(@Param() params): Observable<Project> {
        return this.projectService.findOne(params.id);
    }

    @Get()
    findAll(): Observable<Project[]> {
        return this.projectService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.projectService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() project: Project): Observable<any> {
        return this.projectService.updateOne(Number(id), project);
    }

}
