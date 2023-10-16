import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesFieldToUserTable1697463837960 implements MigrationInterface {
    name = 'AddRolesFieldToUserTable1697463837960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
