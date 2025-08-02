import { MigrationInterface, QueryRunner } from "typeorm";

export class Third1754135663941 implements MigrationInterface {
    name = 'Third1754135663941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1"`);
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_89d84b8919f99324d5108a9b2ef"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "classId" TO "classesId"`);
        await queryRunner.query(`ALTER TABLE "class_course" RENAME COLUMN "classId" TO "classesId"`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_cecd9917e4238d8fddf65831b4e" FOREIGN KEY ("classesId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_a49ac33443e10df9985113cb999" FOREIGN KEY ("classesId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_a49ac33443e10df9985113cb999"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_cecd9917e4238d8fddf65831b4e"`);
        await queryRunner.query(`ALTER TABLE "class_course" RENAME COLUMN "classesId" TO "classId"`);
        await queryRunner.query(`ALTER TABLE "student" RENAME COLUMN "classesId" TO "classId"`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_89d84b8919f99324d5108a9b2ef" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_bd5c8f2ef67394162384a484ba1" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
