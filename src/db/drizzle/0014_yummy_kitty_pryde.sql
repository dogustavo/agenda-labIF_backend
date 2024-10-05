ALTER TABLE `schedules` ADD `status` enum('pending','approved','repproved') DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `schedules` DROP COLUMN `teste`;