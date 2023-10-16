import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValForRefreshTokenInUserTable1696050119844 implements MigrationInterface {
    name = 'SetDefaultValForRefreshTokenInUserTable1696050119844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
