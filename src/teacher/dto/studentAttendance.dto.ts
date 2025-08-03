import { IsEnum, IsInt } from "class-validator";

export enum AttendanceStatus {
    PRESENT = 'present',
    ABSENT = 'absent',
}

export class StudentAttendanceDto {


    @IsInt()
    studentId: number;

    @IsEnum(AttendanceStatus)
    status: AttendanceStatus;

}