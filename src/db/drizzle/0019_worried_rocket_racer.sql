ALTER TABLE `schedules` RENAME COLUMN `evaluate_by` TO `evaluated_by`;--> statement-breakpoint
ALTER TABLE `schedules` RENAME COLUMN `evaluate_at` TO `evaluated_at`;--> statement-breakpoint
ALTER TABLE `schedules` DROP FOREIGN KEY `schedules_evaluate_by_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_evaluated_by_users_id_fk` FOREIGN KEY (`evaluated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;