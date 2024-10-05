ALTER TABLE `schedules` MODIFY COLUMN `schedule_date` date NOT NULL;--> statement-breakpoint
ALTER TABLE `schedules` ADD `time_init` time NOT NULL;--> statement-breakpoint
ALTER TABLE `schedules` ADD `time_end` time NOT NULL;