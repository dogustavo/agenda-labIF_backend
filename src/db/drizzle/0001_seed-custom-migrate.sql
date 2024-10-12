-- Custom SQL migration file, put your code below! --
INSERT INTO `user_roles` (`role`) VALUES
('user'),
('approver'),
('admin');
--> statement-breakpoint
INSERT INTO `user_type` (`description`, `is_intern`) VALUES
('Aluno', true),
('Professor', true),
('Outros', false);
