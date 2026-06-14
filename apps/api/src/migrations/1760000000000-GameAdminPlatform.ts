import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameAdminPlatform1760000000000 implements MigrationInterface {
  name = 'GameAdminPlatform1760000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD COLUMN IF NOT EXISTS "is_system" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `UPDATE "roles" SET "is_system" = true WHERE "code" IN ('ADMIN', 'CONTRIBUTOR', 'USER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "title_i18n" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "short_description_i18n" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "detailed_description_i18n" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "is_published" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`
      UPDATE "projects"
      SET
        "title_i18n" = jsonb_build_object('pl', "title", 'en', "title", 'de', "title"),
        "short_description_i18n" = jsonb_build_object('pl', "short_description", 'en', "short_description", 'de', "short_description"),
        "detailed_description_i18n" = jsonb_build_object('pl', "detailed_description", 'en', "detailed_description", 'de', "detailed_description")
      WHERE "title_i18n" IS NULL
    `);
    await queryRunner.query(
      `UPDATE "projects" SET "is_published" = true WHERE "title_i18n" IS NOT NULL`,
    );
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "announcements" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" jsonb NOT NULL,
        "content" jsonb NOT NULL,
        "action_label" jsonb,
        "action_url" varchar(500),
        "variant" varchar(20) NOT NULL DEFAULT 'INFO',
        "dismissible" boolean NOT NULL DEFAULT true,
        "published" boolean NOT NULL DEFAULT false,
        "version" integer NOT NULL DEFAULT 1,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "announcements_one_published"
      ON "announcements" ("published") WHERE "published" = true
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "game_bosses" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "slug" varchar(80) UNIQUE NOT NULL,
        "name" jsonb NOT NULL,
        "description" jsonb NOT NULL,
        "published" boolean NOT NULL DEFAULT false,
        "max_rounds" integer NOT NULL DEFAULT 15,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "game_questions" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "boss_id" uuid NOT NULL REFERENCES "game_bosses"("uuid") ON DELETE CASCADE,
        "content" jsonb NOT NULL,
        "explanation" jsonb NOT NULL,
        "type" varchar(30) NOT NULL,
        "category" varchar(80) NOT NULL,
        "difficulty" integer NOT NULL DEFAULT 1,
        "source_url" varchar(500) NOT NULL,
        "verified_at" date NOT NULL,
        "published" boolean NOT NULL DEFAULT false,
        "version" integer NOT NULL DEFAULT 1,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "game_answers" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "question_id" uuid NOT NULL REFERENCES "game_questions"("uuid") ON DELETE CASCADE,
        "content" jsonb NOT NULL,
        "is_correct" boolean NOT NULL DEFAULT false,
        "order_index" integer,
        "match_key" varchar(80)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "game_sessions" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "boss_uuid" uuid NOT NULL,
        "victory" boolean NOT NULL,
        "rounds" integer NOT NULL,
        "team_score" integer NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "game_participants" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "session_id" uuid NOT NULL REFERENCES "game_sessions"("uuid") ON DELETE CASCADE,
        "user_uuid" uuid,
        "nickname" varchar(40) NOT NULL,
        "score" integer NOT NULL,
        "correct_answers" integer NOT NULL,
        "total_answers" integer NOT NULL
      )
    `);
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "audit_logs" (
        "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_uuid" uuid,
        "method" varchar(20) NOT NULL,
        "resource" varchar(500) NOT NULL,
        "action" varchar(100) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "audit_logs"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "game_participants"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "game_sessions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "game_answers"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "game_questions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "game_bosses"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "announcements"`);
    await queryRunner.query(
      `ALTER TABLE "projects" DROP COLUMN IF EXISTS "is_published"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP COLUMN IF EXISTS "detailed_description_i18n"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP COLUMN IF EXISTS "short_description_i18n"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP COLUMN IF EXISTS "title_i18n"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" DROP COLUMN IF EXISTS "is_system"`,
    );
  }
}
