import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private readonly dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());

  }

}