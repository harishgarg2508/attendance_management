import { Injectable, NotFoundException } from '@nestjs/common';
import { Class } from 'src/class/entities/class.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(private readonly dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());

  }

}