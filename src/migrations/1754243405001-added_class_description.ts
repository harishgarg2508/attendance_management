import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedClassDescription1754243405001 implements MigrationInterface {
    name = 'AddedClassDescription1754243405001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "desctiption" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "desctiption"`);
    }

}
