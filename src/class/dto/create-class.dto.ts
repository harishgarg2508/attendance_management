import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { ClassCourseTeacherDto } from "./course-teacher.dto";
import { Type } from "class-transformer";
import { Student } from "src/student/entities/student.entity";
import { StudentDto } from "./student.dto";
import { Standard } from "../enums/standard.enum";

export class CreateClassDto {
    
   
    @IsEnum(Standard)
    standard: Standard;

    @IsString()
    academicYear: string;

    @IsNumber()
    adminId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=>StudentDto)
    students:StudentDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=>ClassCourseTeacherDto)
    courseTeacher:ClassCourseTeacherDto[];
}
