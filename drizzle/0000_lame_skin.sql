CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`email` varchar(255) NOT NULL,
	`password` varchar(50) NOT NULL,
	`role` enum('user','approver','admin') NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
