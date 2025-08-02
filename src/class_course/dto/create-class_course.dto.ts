import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateClassCourseDto {
    
    @IsNumber()
    @IsNotEmpty()
    courseId: number;

    @IsNumber()
    @IsNotEmpty()
    classId: number;

}
