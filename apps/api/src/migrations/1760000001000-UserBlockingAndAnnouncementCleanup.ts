import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserBlockingAndAnnouncementCleanup1760000001000 implements MigrationInterface {
  name = 'UserBlockingAndAnnouncementCleanup1760000001000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "blocked_until" timestamptz`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "blocked_reason" varchar(500)`,
    );
    await queryRunner.query(
      `ALTER TABLE "announcements" DROP COLUMN IF EXISTS "version"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "announcements" ADD COLUMN IF NOT EXISTS "version" integer NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN IF EXISTS "blocked_reason"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN IF EXISTS "blocked_until"`,
    );
  }
}
