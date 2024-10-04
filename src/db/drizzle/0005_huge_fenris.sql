CREATE TABLE `schedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` varchar(255) NOT NULL,
	`scheduled_by` int NOT NULL,
	`approved_at` timestamp,
	`schedule_date` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `schedules_id` PRIMARY KEY(`id`)
);
