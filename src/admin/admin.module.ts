import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { AdminRepository } from 'src/repository/admin.repository';

@Module({
  imports: [StudentModule,TeacherModule],
  controllers: [AdminController],
  providers: [AdminService,AdminRepository],
})
export class AdminModule {}
