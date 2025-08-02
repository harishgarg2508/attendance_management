import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1754135258008 implements MigrationInterface {
    name = 'Second1754135258008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_362b4a77244812eff867eb443b2" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_362b4a77244812eff867eb443b2"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "adminId"`);
    }

}
