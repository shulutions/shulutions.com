import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { UserModule } from 'src/user/user.module';
import { ProjectEntity } from './model/project.entity';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './service/project.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectImage } from './model/projectImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ProjectImage]),
    AuthModule,
    UserModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
