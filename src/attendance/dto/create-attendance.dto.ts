import { IsBoolean, IsEnum, IsInt, Max, Min } from "class-validator";
import { State } from "../state.enum";

export class CreateAttendanceDto {



    @IsInt()
    @Min(1)
    classId: number

    @IsInt()
    @Min(1)
    courseId: number

    @IsInt()
    @Max(30)
    @Min(1)
    session_Number: number
    
    @IsInt()
    @Min(1) 
    studentId: number

    @IsEnum(State)
    attendance_status: State

    

}
