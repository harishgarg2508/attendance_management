import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private readonly dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }
  async getAllAdmins() {
    const qb = this.createQueryBuilder('admin')
      .leftJoin('admin.classes', 'classes').addSelect(['classes.standard','classes.academicYear'])

    .orderBy('admin.id', 'ASC')
    .skip(0).take(10);

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
    };
  }
}
