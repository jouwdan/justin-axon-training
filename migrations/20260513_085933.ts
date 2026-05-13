import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_profile_intro_max_width" AS ENUM('3xl', '5xl', 'none');
  CREATE TYPE "public"."enum_pages_blocks_profile_intro_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_content_style" AS ENUM('plain', 'card');
  CREATE TYPE "public"."enum_pages_blocks_bullet_list_quote_background" AS ENUM('gradient', 'brand', 'muted', 'background');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_navigation_header_menu_child_items_sub_items_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_header_menu_child_items_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_footer_columns_items_child_items_link_type" AS ENUM('page', 'custom');
  ALTER TYPE "public"."enum_pages_blocks_card_grid_cards_icon" ADD VALUE 'Eye' BEFORE 'FileText';
  ALTER TYPE "public"."enum_pages_blocks_bullet_list_icon" ADD VALUE 'Eye' BEFORE 'FileText';
  ALTER TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon" ADD VALUE 'Eye' BEFORE 'FileText';
  ALTER TYPE "public"."enum_pages_blocks_steps_steps_icon" ADD VALUE 'Eye' BEFORE 'FileText';
  CREATE TABLE "pages_blocks_profile_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar DEFAULT 'Profile image',
  	"body" jsonb NOT NULL,
  	"max_width" "enum_pages_blocks_profile_intro_max_width" DEFAULT '5xl',
  	"background" "enum_pages_blocks_profile_intro_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_header_menu_child_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_header_menu_child_items_sub_items_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_header_menu_child_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_header_menu_child_items_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_footer_columns_items_child_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_footer_columns_items_child_items_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  ALTER TABLE "pages_blocks_content_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_grid_cards_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_header_menu_children" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_content_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards_bullets" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "navigation_header_menu_children" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "body" jsonb;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "style" "enum_pages_blocks_content_style" DEFAULT 'plain';
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "body" jsonb;
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "bottom_note" varchar;
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "pages_blocks_card_grid" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "pages_blocks_bullet_list" ADD COLUMN "quote" varchar;
  ALTER TABLE "pages_blocks_bullet_list" ADD COLUMN "quote_author" varchar;
  ALTER TABLE "pages_blocks_bullet_list" ADD COLUMN "quote_background" "enum_pages_blocks_bullet_list_quote_background" DEFAULT 'gradient';
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "form_submissions_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "default_hero_image_id" integer;
  ALTER TABLE "pages_blocks_profile_intro" ADD CONSTRAINT "pages_blocks_profile_intro_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_profile_intro" ADD CONSTRAINT "pages_blocks_profile_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_child_items_sub_items" ADD CONSTRAINT "navigation_header_menu_child_items_sub_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_child_items_sub_items" ADD CONSTRAINT "navigation_header_menu_child_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_menu_child_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_child_items" ADD CONSTRAINT "navigation_header_menu_child_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_child_items" ADD CONSTRAINT "navigation_header_menu_child_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_items_child_items" ADD CONSTRAINT "navigation_footer_columns_items_child_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_items_child_items" ADD CONSTRAINT "navigation_footer_columns_items_child_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_profile_intro_order_idx" ON "pages_blocks_profile_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_profile_intro_parent_id_idx" ON "pages_blocks_profile_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_profile_intro_path_idx" ON "pages_blocks_profile_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_profile_intro_image_idx" ON "pages_blocks_profile_intro" USING btree ("image_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "navigation_header_menu_child_items_sub_items_order_idx" ON "navigation_header_menu_child_items_sub_items" USING btree ("_order");
  CREATE INDEX "navigation_header_menu_child_items_sub_items_parent_id_idx" ON "navigation_header_menu_child_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_menu_child_items_sub_items_page_idx" ON "navigation_header_menu_child_items_sub_items" USING btree ("page_id");
  CREATE INDEX "navigation_header_menu_child_items_order_idx" ON "navigation_header_menu_child_items" USING btree ("_order");
  CREATE INDEX "navigation_header_menu_child_items_parent_id_idx" ON "navigation_header_menu_child_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_menu_child_items_page_idx" ON "navigation_header_menu_child_items" USING btree ("page_id");
  CREATE INDEX "navigation_footer_columns_items_child_items_order_idx" ON "navigation_footer_columns_items_child_items" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_items_child_items_parent_id_idx" ON "navigation_footer_columns_items_child_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_items_child_items_page_idx" ON "navigation_footer_columns_items_child_items" USING btree ("page_id");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_hero_image_id_media_id_fk" FOREIGN KEY ("default_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_hero_image_idx" ON "site_settings" USING btree ("default_hero_image_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "background_image_url";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "outcome";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  ALTER TABLE "site_settings" DROP COLUMN "logo_url";
  ALTER TABLE "site_settings" DROP COLUMN "default_hero_image_url";
  DROP TYPE "public"."enum_contact_submissions_service";
  DROP TYPE "public"."enum_contact_submissions_sector";
  DROP TYPE "public"."enum_navigation_header_menu_children_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_submissions_service" AS ENUM('training', 'consultancy', 'other');
  CREATE TYPE "public"."enum_contact_submissions_sector" AS ENUM('early-years', 'primary', 'secondary', 'special-schools', 'post-16', 'alternative-provision', 'local-authority', 'health-clinical', 'social-care', 'activity-providers', 'family-community', 'emergency-services', 'customer-experience', 'parents-carers', 'corporate-business', 'workforce-agencies', 'other');
  CREATE TYPE "public"."enum_navigation_header_menu_children_link_type" AS ENUM('page', 'custom');
  CREATE TABLE "pages_blocks_content_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"organisation" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service" "enum_contact_submissions_service",
  	"sector" "enum_contact_submissions_sector",
  	"message" varchar NOT NULL,
  	"preferred_contact" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_header_menu_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_header_menu_children_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  ALTER TABLE "pages_blocks_profile_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions_submission_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "form_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_header_menu_child_items_sub_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_header_menu_child_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_footer_columns_items_child_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_profile_intro" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "navigation_header_menu_child_items_sub_items" CASCADE;
  DROP TABLE "navigation_header_menu_child_items" CASCADE;
  DROP TABLE "navigation_footer_columns_items_child_items" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_form_submissions_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_default_hero_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  ALTER TABLE "pages_blocks_card_grid_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_card_grid_cards_icon" USING "icon"::"public"."enum_pages_blocks_card_grid_cards_icon";
  ALTER TABLE "pages_blocks_bullet_list" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_bullet_list" ALTER COLUMN "icon" SET DEFAULT 'CheckCircle'::text;
  DROP TYPE "public"."enum_pages_blocks_bullet_list_icon";
  CREATE TYPE "public"."enum_pages_blocks_bullet_list_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  ALTER TABLE "pages_blocks_bullet_list" ALTER COLUMN "icon" SET DEFAULT 'CheckCircle'::"public"."enum_pages_blocks_bullet_list_icon";
  ALTER TABLE "pages_blocks_bullet_list" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_bullet_list_icon" USING "icon"::"public"."enum_pages_blocks_bullet_list_icon";
  ALTER TABLE "pages_blocks_training_areas_category_overrides" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon";
  CREATE TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  ALTER TABLE "pages_blocks_training_areas_category_overrides" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon" USING "icon"::"public"."enum_pages_blocks_training_areas_category_overrides_icon";
  ALTER TABLE "pages_blocks_steps_steps" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_steps_steps_icon";
  CREATE TYPE "public"."enum_pages_blocks_steps_steps_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  ALTER TABLE "pages_blocks_steps_steps" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_steps_steps_icon" USING "icon"::"public"."enum_pages_blocks_steps_steps_icon";
  DROP INDEX "pages_blocks_hero_background_image_idx";
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "payload_locked_documents_rels_forms_id_idx";
  DROP INDEX "payload_locked_documents_rels_form_submissions_id_idx";
  DROP INDEX "site_settings_logo_idx";
  DROP INDEX "site_settings_default_hero_image_idx";
  ALTER TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "background_image_url" varchar;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD COLUMN "outcome" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "logo_url" varchar DEFAULT '/icon.png';
  ALTER TABLE "site_settings" ADD COLUMN "default_hero_image_url" varchar DEFAULT 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-only-MZLwnURIyegWpg5czkYni9Jgohgor4.png';
  ALTER TABLE "pages_blocks_content_paragraphs" ADD CONSTRAINT "pages_blocks_content_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards_bullets" ADD CONSTRAINT "pages_blocks_card_grid_cards_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_children" ADD CONSTRAINT "navigation_header_menu_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_children" ADD CONSTRAINT "navigation_header_menu_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_paragraphs_order_idx" ON "pages_blocks_content_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_paragraphs_parent_id_idx" ON "pages_blocks_content_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_bullets_order_idx" ON "pages_blocks_card_grid_cards_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_bullets_parent_id_idx" ON "pages_blocks_card_grid_cards_bullets" USING btree ("_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "navigation_header_menu_children_order_idx" ON "navigation_header_menu_children" USING btree ("_order");
  CREATE INDEX "navigation_header_menu_children_parent_id_idx" ON "navigation_header_menu_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_menu_children_page_idx" ON "navigation_header_menu_children" USING btree ("page_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "background_image_id";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "body";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "style";
  ALTER TABLE "pages_blocks_card_grid_cards" DROP COLUMN "body";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "bottom_note";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "cta_label";
  ALTER TABLE "pages_blocks_card_grid" DROP COLUMN "cta_url";
  ALTER TABLE "pages_blocks_bullet_list" DROP COLUMN "quote";
  ALTER TABLE "pages_blocks_bullet_list" DROP COLUMN "quote_author";
  ALTER TABLE "pages_blocks_bullet_list" DROP COLUMN "quote_background";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "forms_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "form_submissions_id";
  ALTER TABLE "site_settings" DROP COLUMN "logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "default_hero_image_id";
  DROP TYPE "public"."enum_pages_blocks_profile_intro_max_width";
  DROP TYPE "public"."enum_pages_blocks_profile_intro_background";
  DROP TYPE "public"."enum_pages_blocks_content_style";
  DROP TYPE "public"."enum_pages_blocks_bullet_list_quote_background";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_navigation_header_menu_child_items_sub_items_link_type";
  DROP TYPE "public"."enum_navigation_header_menu_child_items_link_type";
  DROP TYPE "public"."enum_navigation_footer_columns_items_child_items_link_type";`)
}
