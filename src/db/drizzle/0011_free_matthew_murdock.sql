ALTER TABLE `schedules` RENAME COLUMN `status` TO `role`;--> statement-breakpoint
ALTER TABLE `schedules` MODIFY COLUMN `role` enum('pending','approved','repproved') NOT NULL DEFAULT 'pending';