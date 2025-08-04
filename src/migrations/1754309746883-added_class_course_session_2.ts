import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedClassCourseSession21754309746883 implements MigrationInterface {
    name = 'AddedClassCourseSession21754309746883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_4f60fb706978092d02fcad447aa"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_8d0d4fbe9b41fd0ddb20fb495e3"`);
        await queryRunner.query(`CREATE TABLE "class_course_session" ("id" SERIAL NOT NULL, "session_number" integer NOT NULL, "classCourseId" integer, CONSTRAINT "PK_917e1258f3832c5a658f36c00c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "isPresent"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "studentSessionId"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "classesId"`);
        await queryRunner.query(`CREATE TYPE "public"."attendance_state_enum" AS ENUM('present', 'absent', 'unmarked')`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "state" "public"."attendance_state_enum" NOT NULL DEFAULT 'unmarked'`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "classCourseSessionId" integer`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "studentId" integer`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_d037d56487acec9b87822c772db" FOREIGN KEY ("classCourseSessionId") REFERENCES "class_course_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_120e1c6edcec4f8221f467c8039" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course_session" ADD CONSTRAINT "FK_c0035cbebd6d1db030e92471ba9" FOREIGN KEY ("classCourseId") REFERENCES "class_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_course_session" DROP CONSTRAINT "FK_c0035cbebd6d1db030e92471ba9"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_120e1c6edcec4f8221f467c8039"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_d037d56487acec9b87822c772db"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "classCourseSessionId"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP COLUMN "state"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_state_enum"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "classesId" integer`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "studentSessionId" integer`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD "isPresent" boolean NOT NULL`);
        await queryRunner.query(`DROP TABLE "class_course_session"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_8d0d4fbe9b41fd0ddb20fb495e3" FOREIGN KEY ("classesId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_4f60fb706978092d02fcad447aa" FOREIGN KEY ("studentSessionId") REFERENCES "student_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
