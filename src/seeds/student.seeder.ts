import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class StudentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const studentRepository = dataSource.getRepository(Student);

    const existingStudents = await studentRepository.find();
    if (existingStudents.length > 0) {
      console.log('Students already exist, skipping seeding.');
      return;
    }

    const studentData = [
      {
        name: 'Emma Taylor',
        studentId: 11111,
      },
      {
        name: 'Olivia Brown',
        studentId: 11112,
      },
      {
        name: 'Ava Lee',
        studentId: 11113,
      },
      {
        name: 'Isabella Davis',
        studentId: 11114,
      },
      {
        name: 'Sophia Hall',
        studentId: 11115,
      },
      {
        name: 'Mia Martin',
        studentId: 11116,
      },
      {
        name: 'Charlotte White',
        studentId: 11117,
      },
      {
        name: 'Amelia Jackson',
        studentId: 11118,
      },
    ];

    await studentRepository.save(studentData);
    console.log('Student Seeding successful!');
  }

  public async revert(dataSource: DataSource): Promise<any> {
    const studentRepository = dataSource.getRepository(Student);
    await studentRepository.clear();
    console.log('Teacher data cleared.');
  }
}