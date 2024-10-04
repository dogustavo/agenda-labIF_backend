CREATE TABLE `equipaments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`equipament_name` varchar(50) NOT NULL,
	`available_from` time NOT NULL,
	`available_to` time NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `equipaments_id` PRIMARY KEY(`id`),
	CONSTRAINT `equipaments_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role` enum('user','approver','admin') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `schedules` ADD `approved_by` int;--> statement-breakpoint
ALTER TABLE `schedules` ADD `equipament_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `role`;