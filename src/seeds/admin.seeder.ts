import { Admin } from 'src/admin/entities/admin.entity';
import {  DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const adminRepository = dataSource.getRepository(Admin);
    const existingAdmins = await adminRepository.find();
    if (existingAdmins.length > 0) {
      console.log('Admins already exist, skipping seeding.');
      return;
    }

    const adminData =  [
      {
        name: 'admin1',
        adminId: 123456,
      },
      {
        name: 'admin2',
        adminId: 654321,
      },
      {
        name: 'admin3',
        adminId: 123789,
      },
      {
        name: 'admin4',
        adminId: 987654,
      },
      {
        name: 'admin5',
        adminId: 456789,
      },
    ];
    await adminRepository.save(adminData);
    console.log('Admin seeding successful!');
  }
}