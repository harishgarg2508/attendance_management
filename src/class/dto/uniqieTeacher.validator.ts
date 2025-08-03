import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClassCourseTeacherDto } from './course-teacher.dto';
@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  validate(value: ClassCourseTeacherDto[], args: ValidationArguments) {
    if (!Array.isArray(value) || value.length === 0) {
      return false;
    }

    const teacherIds = value.map((item) => item.teacherId);
    const uniqueTeacherIds = new Set(teacherIds);
    if (uniqueTeacherIds.size !== teacherIds.length) {
      return false;
    }

    const courseIds = value.map((item) => item.courseId);
    const uniqueCourseIds = new Set(courseIds);
    if (uniqueCourseIds.size !== courseIds.length) {
      return false;
    }

    const combinations = value.map(
      (item) => `${item.teacherId}-${item.courseId}`,
    );
    const uniqueCombinations = new Set(combinations);
    if (uniqueCombinations.size !== combinations.length) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each teacher can only be assigned once, each course can only be assigned once, and no duplicate teacher-course combinations are allowed.';
  }
}