import { IsArray, IsEnum, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { ClassCourseTeacherDto } from "./course-teacher.dto";
import { Type } from "class-transformer";
import { StudentDto } from "./student.dto";
import { Standard } from "../enums/standard.enum";
import { UniqueConstraint } from "./uniqieTeacher.validator";

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
    @Validate(UniqueConstraint)
    courseTeacher:ClassCourseTeacherDto[];
}
