import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnsureRoleSystemColumn1760000002000 implements MigrationInterface {
  name = 'EnsureRoleSystemColumn1760000002000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD COLUMN IF NOT EXISTS "is_system" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `UPDATE "roles" SET "is_system" = true WHERE "code" IN ('ADMIN', 'CONTRIBUTOR', 'USER')`,
    );
  }

  async down(): Promise<void> {
    // The column belongs to the current RoleEntity schema and is kept on rollback.
  }
}
