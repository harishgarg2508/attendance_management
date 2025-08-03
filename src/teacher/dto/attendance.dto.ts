import { IsArray, IsEnum, IsInt, ValidateNested } from "class-validator";
import { StudentAttendanceDto } from "./studentAttendance.dto";
import { Type } from "class-transformer";



export class AttendanceDto {

    @IsInt()
    teacherId: number;

    @IsInt()
    classId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=>StudentAttendanceDto)
    studentAttendance:StudentAttendanceDto[];

}