import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableBook1730058882462 implements MigrationInterface {
    name = 'CreateTableBook1730058882462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL, "title" character varying NOT NULL, "summary" character varying NOT NULL, "author" character varying NOT NULL, "total_pages" integer NOT NULL, "created_at" TIME NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}