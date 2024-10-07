ALTER TABLE `schedules` RENAME COLUMN `approved_by` TO `evaluate_by`;--> statement-breakpoint
ALTER TABLE `schedules` RENAME COLUMN `approved_at` TO `evaluate_at`;--> statement-breakpoint
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_approved_by_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_evaluate_by_users_id_fk` FOREIGN KEY (`evaluate_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;