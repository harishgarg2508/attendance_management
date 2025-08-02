import { Course } from 'src/course/entities/course.entity';
import {  DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const courseRepository = dataSource.getRepository(Course);
    const existingCourses = await courseRepository.find();
    if (existingCourses.length > 0) {
      console.log('Courses already exist, skipping seeding.');
      return;
    }

    const courseData =  [
      {
        name: 'MATHS',
        description: "you'll learn about maths here",
      },
      {
        name: 'SCIENCE',
        description: "you'll learn about science here",
      },
      {
        name: 'ENGLISH',
        description: "you'll learn about english here",
      },
    ];
    await courseRepository.save(courseData);
    console.log('Courses seeding successful!');
  }
}