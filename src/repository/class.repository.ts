import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { CreateClassDto } from 'src/class/dto/create-class.dto';
import { Class } from 'src/class/entities/class.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(private readonly dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());

  }

  async createClass(createClassDto: CreateClassDto, admin: Admin): Promise<Class> {
    const classEntity = this.create({
      ...createClassDto,
      admin, 
    });

    const classData = await this.save(classEntity);
    return classData;
  
  }

}