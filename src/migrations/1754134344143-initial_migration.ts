import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754134344143 implements MigrationInterface {
    name = 'InitialMigration1754134344143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "teacherId" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_5e88d094d0152870a9eb4804aa9" UNIQUE ("teacherId"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_course_teacher" ("id" SERIAL NOT NULL, "classCourseId" integer, "teacherId" integer, CONSTRAINT "PK_5c2b850a6f93bf371ff43b0a3cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_course" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "courseId" integer, "classId" integer, CONSTRAINT "PK_57476b73061271c061ae6dd16ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "standard" character varying NOT NULL, "academicYear" character varying NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "studentId" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "classId" integer, CONSTRAINT "UQ_9316abc534487368cfd8527e8df" UNIQUE ("studentId"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "adminId" integer NOT NULL, CONSTRAINT "UQ_abce4cc3fe598f242ab45e529b6" UNIQUE ("adminId"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "class_course_teacher" ADD CONSTRAINT "FK_35a9add20b866b5079a16d1c868" FOREIGN KEY ("classCourseId") REFERENCES "class_course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course_teacher" ADD CONSTRAINT "FK_dbfa4eed6ffaafbc383713be8d5" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_86a8d62a9395cc415cc610ea8c0" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_89d84b8919f99324d5108a9b2ef" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1"`);
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_89d84b8919f99324d5108a9b2ef"`);
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_86a8d62a9395cc415cc610ea8c0"`);
        await queryRunner.query(`ALTER TABLE "class_course_teacher" DROP CONSTRAINT "FK_dbfa4eed6ffaafbc383713be8d5"`);
        await queryRunner.query(`ALTER TABLE "class_course_teacher" DROP CONSTRAINT "FK_35a9add20b866b5079a16d1c868"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "class_course"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "class_course_teacher"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
    }

}
