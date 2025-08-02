import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class TeacherSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const teacherRepository = dataSource.getRepository(Teacher);

    const existingTeachers = await teacherRepository.find();
    if (existingTeachers.length > 0) {
      console.log('Teachers already exist, skipping seeding.');
      return;
    }

    const teacherData = [
      {
        name: 'John Doe',
        teacherId: 12345,
      },
      {
        name: 'Jane Smith',
        teacherId: 12346,
      },
      {
        name: 'Alice Johnson',
        teacherId: 12347,
      },
      {
        name: 'Bob Brown',
        teacherId: 12348,
      },
      {
        name: 'Charlie Davis',
        teacherId: 12349,
      },
      {
        name: 'David Wilson',
        teacherId: 12350,
      },
      {
        name: 'Eve Adams',
        teacherId: 12351,
      },
      {
        name: 'Eve Adams',
        teacherId: 12352,
      },
      {
        name: 'Frank Miller',
        teacherId: 12353,
      },
    ];

    await teacherRepository.save(teacherData);
    console.log('Teacher Seeding successful!');
  }

  public async revert(dataSource: DataSource): Promise<any> {
    const teacherRepository = dataSource.getRepository(Teacher);
    await teacherRepository.clear();
    console.log('Teacher data cleared.');
  }
}