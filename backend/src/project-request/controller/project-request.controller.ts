import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ProjectRequestService } from '../service/project-request.service';
import { CreateProjectRequestDto } from '../dto/create-project-request.dto';
import { UpdateProjectRequestDto } from '../dto/update-project-request.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectRequest } from '../entities/project-request.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProjectRequestCommentDto } from '../dto/create-project-request-comment.dto';
import { UserEntity } from 'src/user/model/user.entity';
import { ProjectRequestReaction } from '../entities/project-request-reaction.entity';
import { CreateProjectRequestReactionDto } from '../dto/create-project-request-reaction.dto';

@Controller('project-request')
export class ProjectRequestController {
  constructor(private readonly projectRequestService: ProjectRequestService) {}

  @Get('count')
  count(): Observable<number> {
    return this.projectRequestService.getProjectRequestCount();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  create(@Body() createProjectRequestDto: CreateProjectRequestDto, @Request() req): Observable<ProjectRequest> {
    const user = req.user;
    return this.projectRequestService.create(user, createProjectRequestDto);
  }

  @Get()
  index(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Observable<Pagination<ProjectRequest>> {
      limit = limit > 100 ? 100 : limit;
      return this.projectRequestService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/backend/project-request'});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.projectRequestService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProjectRequestDto: UpdateProjectRequestDto) {
    return this.projectRequestService.update(+id, updateProjectRequestDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.projectRequestService.remove(+id);
  }

  @Post(':id/comment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  createComment(@Param('id') id: string, @Body() comment: CreateProjectRequestCommentDto, @Request() req) {
    console.log(comment)  
    const user = req.user;
    return this.projectRequestService.comment(user, id, comment.comment);
  }

  @Delete('comment/:commentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  deleteComment(@Param('commentId') commentId: number, @Request() req) {
    const user = req.user;
    return this.projectRequestService.deleteComment(user, commentId);
  }

  @Get(':id/comment')
  getComments(@Param('id') id: string, @Request() req) {
    return this.projectRequestService.getComments(id);
  }

  @Post(':id/vote')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  vote(@Param('id') projectRequestId: number, @Body() reaction: CreateProjectRequestReactionDto, @Request() req) {
    const user: UserEntity = req.user;
    return this.projectRequestService.react(user, projectRequestId, reaction)
  }

  // Get a users reaction to a project request
  @Get(':id/vote')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  getReaction(@Param('id') projectRequestId: number, @Request() req) {
    const user: UserEntity = req.user;
    return this.projectRequestService.getReaction(user, projectRequestId);
  }


}
