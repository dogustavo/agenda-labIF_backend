ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `users` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `role` enum('user','approver','admin') DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL;