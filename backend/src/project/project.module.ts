import { Module } from '@nestjs/common';
import { ProjectService } from './service/project.service';
import { ProjectController } from './controller/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './models/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ProjectEntity])
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
