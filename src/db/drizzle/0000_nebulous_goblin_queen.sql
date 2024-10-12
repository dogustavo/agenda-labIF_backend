CREATE TABLE `equipaments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`equipament_name` varchar(50) NOT NULL,
	`available_from` time NOT NULL,
	`available_to` time NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `equipaments_id` PRIMARY KEY(`id`),
	CONSTRAINT `equipaments_id_unique` UNIQUE(`id`),
	CONSTRAINT `equipaments_equipament_name_unique` UNIQUE(`equipament_name`)
);
--> statement-breakpoint
CREATE TABLE `schedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('pending','approved','repproved') NOT NULL DEFAULT 'pending',
	`scheduled_by` int NOT NULL,
	`evaluated_by` int,
	`evaluated_at` timestamp,
	`schedule_date` date NOT NULL,
	`time_init` time NOT NULL,
	`time_end` time NOT NULL,
	`equipament_id` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `schedules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role_id` int NOT NULL,
	`user_type_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role` enum('user','approver','admin') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_roles_id_unique` UNIQUE(`id`),
	CONSTRAINT `user_roles_role_unique` UNIQUE(`role`)
);
--> statement-breakpoint
CREATE TABLE `user_type` (
	`id` int AUTO_INCREMENT NOT NULL,
	`description` varchar(100) NOT NULL,
	`is_intern` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_type_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_type_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_scheduled_by_users_id_fk` FOREIGN KEY (`scheduled_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_evaluated_by_users_id_fk` FOREIGN KEY (`evaluated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `schedules` ADD CONSTRAINT `schedules_equipament_id_equipaments_id_fk` FOREIGN KEY (`equipament_id`) REFERENCES `equipaments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_user_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `user_roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_user_type_id_user_type_id_fk` FOREIGN KEY (`user_type_id`) REFERENCES `user_type`(`id`) ON DELETE no action ON UPDATE no action;