ALTER TABLE `users` ADD `is_blocked` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `is_reseted` boolean DEFAULT false NOT NULL;