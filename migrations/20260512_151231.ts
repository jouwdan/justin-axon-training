import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_buttons_variant" AS ENUM('primary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_height" AS ENUM('hero', 'page', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_hero_header_variant" AS ENUM('transparent', 'solid');
  CREATE TYPE "public"."enum_pages_blocks_content_max_width" AS ENUM('3xl', '5xl', 'none');
  CREATE TYPE "public"."enum_pages_blocks_content_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_bullet_list_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  CREATE TYPE "public"."enum_pages_blocks_bullet_list_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_quote_background" AS ENUM('gradient', 'brand', 'muted', 'background');
  CREATE TYPE "public"."enum_pages_blocks_cta_buttons_variant" AS ENUM('primary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_cta_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_training_areas_category_overrides_key" AS ENUM('education', 'public-sector-health', 'activity-youth-community', 'emergency-frontline', 'customer-experience', 'parents-carers', 'corporate-business', 'workforce-agencies');
  CREATE TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  CREATE TYPE "public"."enum_pages_blocks_training_areas_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_feed_bottom_cta_buttons_variant" AS ENUM('primary', 'outline', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_feed_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_pricing_table_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_pages_blocks_steps_steps_icon" AS ENUM('ArrowRight', 'BarChart3', 'Brain', 'Briefcase', 'Building2', 'Calendar', 'CheckCircle', 'ClipboardCheck', 'Clock', 'FileText', 'GraduationCap', 'Heart', 'Home', 'Lightbulb', 'Mail', 'MapPin', 'MessageCircle', 'Phone', 'Quote', 'Shield', 'Target', 'Users', 'Video');
  CREATE TYPE "public"."enum_pages_blocks_steps_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_steps_background" AS ENUM('background', 'muted', 'brand');
  CREATE TYPE "public"."enum_training_areas_category" AS ENUM('education', 'public-sector-health', 'activity-youth-community', 'emergency-frontline', 'customer-experience', 'parents-carers', 'corporate-business', 'workforce-agencies');
  CREATE TYPE "public"."enum_contact_submissions_service" AS ENUM('training', 'consultancy', 'other');
  CREATE TYPE "public"."enum_contact_submissions_sector" AS ENUM('early-years', 'primary', 'secondary', 'special-schools', 'post-16', 'alternative-provision', 'local-authority', 'health-clinical', 'social-care', 'activity-providers', 'family-community', 'emergency-services', 'customer-experience', 'parents-carers', 'corporate-business', 'workforce-agencies', 'other');
  CREATE TYPE "public"."enum_navigation_header_menu_children_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_header_menu_link_type" AS ENUM('page', 'custom');
  CREATE TYPE "public"."enum_navigation_footer_columns_items_link_type" AS ENUM('page', 'custom');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_hero_buttons_variant" DEFAULT 'primary',
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background_image_url" varchar,
  	"height" "enum_pages_blocks_hero_height" DEFAULT 'page',
  	"header_variant" "enum_pages_blocks_hero_header_variant" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"centered" boolean DEFAULT false,
  	"max_width" "enum_pages_blocks_content_max_width" DEFAULT '5xl',
  	"background" "enum_pages_blocks_content_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor_id" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_pages_blocks_card_grid_cards_icon",
  	"href" varchar,
  	"link_label" varchar,
  	"outcome" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"background" "enum_pages_blocks_card_grid_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bullet_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_bullet_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"icon" "enum_pages_blocks_bullet_list_icon" DEFAULT 'CheckCircle',
  	"background" "enum_pages_blocks_bullet_list_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar,
  	"background" "enum_pages_blocks_quote_background" DEFAULT 'gradient',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_cta_buttons_variant" DEFAULT 'primary',
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background" "enum_pages_blocks_cta_background" DEFAULT 'brand',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_training_areas_category_overrides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_pages_blocks_training_areas_category_overrides_key" NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_training_areas_category_overrides_icon"
  );
  
  CREATE TABLE "pages_blocks_training_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"show_category_descriptions" boolean DEFAULT true,
  	"show_audience" boolean DEFAULT true,
  	"bottom_note" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"background" "enum_pages_blocks_training_areas_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_pages_blocks_testimonials_feed_bottom_cta_buttons_variant" DEFAULT 'primary',
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_testimonials_feed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"limit" numeric DEFAULT 50,
  	"show_feedback_cta" boolean DEFAULT true,
  	"feedback_title" varchar,
  	"feedback_text" varchar,
  	"feedback_button_label" varchar,
  	"show_bottom_cta" boolean DEFAULT false,
  	"bottom_cta_heading" varchar,
  	"bottom_cta_text" varchar,
  	"background" "enum_pages_blocks_testimonials_feed_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_table_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_table_additional_costs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_pricing_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"additional_costs_heading" varchar,
  	"background" "enum_pages_blocks_pricing_table_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"show_contact_info" boolean DEFAULT true,
  	"show_form" boolean DEFAULT true,
  	"contact_info_title" varchar,
  	"availability_heading" varchar,
  	"background" "enum_pages_blocks_contact_section_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_pages_blocks_steps_steps_icon"
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"columns" "enum_pages_blocks_steps_columns" DEFAULT '4',
  	"background" "enum_pages_blocks_steps_background" DEFAULT 'background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"published" boolean DEFAULT true,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "training_areas_help_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "training_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_training_areas_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"description" varchar NOT NULL,
  	"audience" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"training_areas_id" integer,
  	"testimonials_id" integer,
  	"contact_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_url" varchar DEFAULT '/icon.png',
  	"default_hero_image_url" varchar DEFAULT 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-only-MZLwnURIyegWpg5czkYni9Jgohgor4.png',
  	"footer_description" varchar DEFAULT 'Creating emotionally safe, inclusive experiences for neurodiverse children, young people, adults and their families.',
  	"email" varchar DEFAULT 'Justin.Axon@outlook.com',
  	"phone" varchar DEFAULT '07534 845 636',
  	"linkedin_url" varchar DEFAULT 'https://www.linkedin.com/in/justinaxon/',
  	"availability_text" varchar DEFAULT 'I offer weekday sessions and limited weekend availability for community providers. I aim to respond to enquiries within 48 hours.',
  	"feedback_form_url" varchar DEFAULT 'https://forms.office.com/r/8r4t69HCeN',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE "navigation_header_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_header_menu_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_footer_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_footer_columns_items_link_type" DEFAULT 'page',
  	"page_id" integer,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_paragraphs" ADD CONSTRAINT "pages_blocks_content_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards_bullets" ADD CONSTRAINT "pages_blocks_card_grid_cards_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bullet_list_items" ADD CONSTRAINT "pages_blocks_bullet_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bullet_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bullet_list" ADD CONSTRAINT "pages_blocks_bullet_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_buttons" ADD CONSTRAINT "pages_blocks_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_training_areas_category_overrides" ADD CONSTRAINT "pages_blocks_training_areas_category_overrides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_training_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_training_areas" ADD CONSTRAINT "pages_blocks_training_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" ADD CONSTRAINT "pages_blocks_testimonials_feed_bottom_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_feed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_feed" ADD CONSTRAINT "pages_blocks_testimonials_feed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_categories_items" ADD CONSTRAINT "pages_blocks_pricing_table_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_categories" ADD CONSTRAINT "pages_blocks_pricing_table_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table_additional_costs" ADD CONSTRAINT "pages_blocks_pricing_table_additional_costs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_table" ADD CONSTRAINT "pages_blocks_pricing_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_steps" ADD CONSTRAINT "pages_blocks_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_areas_help_items" ADD CONSTRAINT "training_areas_help_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."training_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_areas_fk" FOREIGN KEY ("training_areas_id") REFERENCES "public"."training_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_children" ADD CONSTRAINT "navigation_header_menu_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu_children" ADD CONSTRAINT "navigation_header_menu_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_header_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_header_menu" ADD CONSTRAINT "navigation_header_menu_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_header_menu" ADD CONSTRAINT "navigation_header_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_items" ADD CONSTRAINT "navigation_footer_columns_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_items" ADD CONSTRAINT "navigation_footer_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_paragraphs_order_idx" ON "pages_blocks_content_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_paragraphs_parent_id_idx" ON "pages_blocks_content_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_cards_bullets_order_idx" ON "pages_blocks_card_grid_cards_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_bullets_parent_id_idx" ON "pages_blocks_card_grid_cards_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_bullet_list_items_order_idx" ON "pages_blocks_bullet_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_bullet_list_items_parent_id_idx" ON "pages_blocks_bullet_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bullet_list_order_idx" ON "pages_blocks_bullet_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_bullet_list_parent_id_idx" ON "pages_blocks_bullet_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bullet_list_path_idx" ON "pages_blocks_bullet_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_buttons_order_idx" ON "pages_blocks_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_buttons_parent_id_idx" ON "pages_blocks_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_training_areas_category_overrides_order_idx" ON "pages_blocks_training_areas_category_overrides" USING btree ("_order");
  CREATE INDEX "pages_blocks_training_areas_category_overrides_parent_id_idx" ON "pages_blocks_training_areas_category_overrides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_training_areas_order_idx" ON "pages_blocks_training_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_training_areas_parent_id_idx" ON "pages_blocks_training_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_training_areas_path_idx" ON "pages_blocks_training_areas" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_feed_bottom_cta_buttons_order_idx" ON "pages_blocks_testimonials_feed_bottom_cta_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_feed_bottom_cta_buttons_parent_id_idx" ON "pages_blocks_testimonials_feed_bottom_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_feed_order_idx" ON "pages_blocks_testimonials_feed" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_feed_parent_id_idx" ON "pages_blocks_testimonials_feed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_feed_path_idx" ON "pages_blocks_testimonials_feed" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_table_categories_items_order_idx" ON "pages_blocks_pricing_table_categories_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_categories_items_parent_id_idx" ON "pages_blocks_pricing_table_categories_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_categories_order_idx" ON "pages_blocks_pricing_table_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_categories_parent_id_idx" ON "pages_blocks_pricing_table_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_additional_costs_order_idx" ON "pages_blocks_pricing_table_additional_costs" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_additional_costs_parent_id_idx" ON "pages_blocks_pricing_table_additional_costs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_order_idx" ON "pages_blocks_pricing_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_table_parent_id_idx" ON "pages_blocks_pricing_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_table_path_idx" ON "pages_blocks_pricing_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_steps_order_idx" ON "pages_blocks_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_steps_parent_id_idx" ON "pages_blocks_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "training_areas_help_items_order_idx" ON "training_areas_help_items" USING btree ("_order");
  CREATE INDEX "training_areas_help_items_parent_id_idx" ON "training_areas_help_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "training_areas_slug_idx" ON "training_areas" USING btree ("slug");
  CREATE INDEX "training_areas_updated_at_idx" ON "training_areas" USING btree ("updated_at");
  CREATE INDEX "training_areas_created_at_idx" ON "training_areas" USING btree ("created_at");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_training_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("training_areas_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_header_menu_children_order_idx" ON "navigation_header_menu_children" USING btree ("_order");
  CREATE INDEX "navigation_header_menu_children_parent_id_idx" ON "navigation_header_menu_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_menu_children_page_idx" ON "navigation_header_menu_children" USING btree ("page_id");
  CREATE INDEX "navigation_header_menu_order_idx" ON "navigation_header_menu" USING btree ("_order");
  CREATE INDEX "navigation_header_menu_parent_id_idx" ON "navigation_header_menu" USING btree ("_parent_id");
  CREATE INDEX "navigation_header_menu_page_idx" ON "navigation_header_menu" USING btree ("page_id");
  CREATE INDEX "navigation_footer_columns_items_order_idx" ON "navigation_footer_columns_items" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_items_parent_id_idx" ON "navigation_footer_columns_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_footer_columns_items_page_idx" ON "navigation_footer_columns_items" USING btree ("page_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_content_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards_bullets" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_bullet_list_items" CASCADE;
  DROP TABLE "pages_blocks_bullet_list" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_training_areas_category_overrides" CASCADE;
  DROP TABLE "pages_blocks_training_areas" CASCADE;
  DROP TABLE "pages_blocks_testimonials_feed_bottom_cta_buttons" CASCADE;
  DROP TABLE "pages_blocks_testimonials_feed" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_categories_items" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_categories" CASCADE;
  DROP TABLE "pages_blocks_pricing_table_additional_costs" CASCADE;
  DROP TABLE "pages_blocks_pricing_table" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "training_areas_help_items" CASCADE;
  DROP TABLE "training_areas" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_header_menu_children" CASCADE;
  DROP TABLE "navigation_header_menu" CASCADE;
  DROP TABLE "navigation_footer_columns_items" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_height";
  DROP TYPE "public"."enum_pages_blocks_hero_header_variant";
  DROP TYPE "public"."enum_pages_blocks_content_max_width";
  DROP TYPE "public"."enum_pages_blocks_content_background";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_card_grid_background";
  DROP TYPE "public"."enum_pages_blocks_bullet_list_icon";
  DROP TYPE "public"."enum_pages_blocks_bullet_list_background";
  DROP TYPE "public"."enum_pages_blocks_quote_background";
  DROP TYPE "public"."enum_pages_blocks_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_background";
  DROP TYPE "public"."enum_pages_blocks_training_areas_category_overrides_key";
  DROP TYPE "public"."enum_pages_blocks_training_areas_category_overrides_icon";
  DROP TYPE "public"."enum_pages_blocks_training_areas_background";
  DROP TYPE "public"."enum_pages_blocks_testimonials_feed_bottom_cta_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_testimonials_feed_background";
  DROP TYPE "public"."enum_pages_blocks_pricing_table_background";
  DROP TYPE "public"."enum_pages_blocks_contact_section_background";
  DROP TYPE "public"."enum_pages_blocks_steps_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_steps_columns";
  DROP TYPE "public"."enum_pages_blocks_steps_background";
  DROP TYPE "public"."enum_training_areas_category";
  DROP TYPE "public"."enum_contact_submissions_service";
  DROP TYPE "public"."enum_contact_submissions_sector";
  DROP TYPE "public"."enum_navigation_header_menu_children_link_type";
  DROP TYPE "public"."enum_navigation_header_menu_link_type";
  DROP TYPE "public"."enum_navigation_footer_columns_items_link_type";`)
}
