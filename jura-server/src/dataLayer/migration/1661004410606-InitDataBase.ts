import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDataBase1661004410606 implements MigrationInterface {
    name = 'InitDataBase1661004410606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`priority\` varchar(255) NOT NULL, \`description\` varchar(500) NOT NULL, \`title\` varchar(255) NOT NULL, \`due_date\` datetime NOT NULL, \`estimated_time\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`spent_time\` int NOT NULL DEFAULT '0', \`projectId\` int NULL, \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`job_title\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` int NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`description\` varchar(500) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`delivered_at\` datetime NULL, \`due_at\` datetime NULL, \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(500) NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`ticketId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_users_user\` (\`ticketId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_3dcfc6330ad85224c923df6324\` (\`ticketId\`), INDEX \`IDX_766995c4e1e30d61e92646416c\` (\`userId\`), PRIMARY KEY (\`ticketId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_members_user\` (\`projectId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_c79bdce48cf47ff04f1ec3a8ca\` (\`projectId\`), INDEX \`IDX_66c5703c0321bafc7c9352098b\` (\`userId\`), PRIMARY KEY (\`projectId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_c6f47d3e270123ccd2f16f13d29\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_cdd21a6b9c9d8ccb0de1c695e7e\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_9884b2ee80eb70b7db4f12e8aed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_7522f1f6b36fa4b1742762a17f9\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_users_user\` ADD CONSTRAINT \`FK_3dcfc6330ad85224c923df6324c\` FOREIGN KEY (\`ticketId\`) REFERENCES \`ticket\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ticket_users_user\` ADD CONSTRAINT \`FK_766995c4e1e30d61e92646416cf\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_members_user\` ADD CONSTRAINT \`FK_c79bdce48cf47ff04f1ec3a8ca5\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`project_members_user\` ADD CONSTRAINT \`FK_66c5703c0321bafc7c9352098b5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_members_user\` DROP FOREIGN KEY \`FK_66c5703c0321bafc7c9352098b5\``);
        await queryRunner.query(`ALTER TABLE \`project_members_user\` DROP FOREIGN KEY \`FK_c79bdce48cf47ff04f1ec3a8ca5\``);
        await queryRunner.query(`ALTER TABLE \`ticket_users_user\` DROP FOREIGN KEY \`FK_766995c4e1e30d61e92646416cf\``);
        await queryRunner.query(`ALTER TABLE \`ticket_users_user\` DROP FOREIGN KEY \`FK_3dcfc6330ad85224c923df6324c\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_7522f1f6b36fa4b1742762a17f9\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_9884b2ee80eb70b7db4f12e8aed\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_cdd21a6b9c9d8ccb0de1c695e7e\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_c6f47d3e270123ccd2f16f13d29\``);
        await queryRunner.query(`DROP INDEX \`IDX_66c5703c0321bafc7c9352098b\` ON \`project_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c79bdce48cf47ff04f1ec3a8ca\` ON \`project_members_user\``);
        await queryRunner.query(`DROP TABLE \`project_members_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_766995c4e1e30d61e92646416c\` ON \`ticket_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_3dcfc6330ad85224c923df6324\` ON \`ticket_users_user\``);
        await queryRunner.query(`DROP TABLE \`ticket_users_user\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
    }

}
