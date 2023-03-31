use service_charge;

select * from roles;
select * from status;
select * from priorities;
select * from users;
select * from invoices;
select * from tickets;
select * from otps;

INSERT otps(user_id, otp) VALUES(1, 12345);

INSERT INTO tickets (user_id, status_id, priority_id, subject, description, created_at, updated_at)
VALUES
(1, 5, 3, 'Website Redesign', '', '2023-04-12', '2023-04-12'),
(1, 7, 1, 'Server Maintenance', '', '2023-04-08', '2023-04-08'),
(1, 6, 2, 'Customer Support Tickets', '', '2023-04-15', '2023-04-15'),
(1, 5, 3, 'Bug Fixing', '', '2023-04-17', '2023-04-17'),
(1, 6, 1, 'Social Media Campaign', '', '2023-04-20', '2023-04-20'),
(1, 5, 2, 'Content Creation', '', '2023-04-22', '2023-04-22'),
(1, 7, 3, 'Email Marketing', '', '2023-04-05', '2023-04-05'),
(1, 8, 1, 'Database Optimization', '', '2023-04-25', '2023-04-25'),
(1, 5, 2, 'Analytics Setup', '', '2023-04-28', '2023-04-28'),
(1, 7, 3, 'SEO Audit', '', '2023-04-02', '2023-04-02'),
(1, 6, 1, 'Security Update', '', '2023-04-30', '2023-04-30'),
(1, 5, 2, 'Mobile App Development', '', '2023-05-03', '2023-05-03'),
(1, 7, 3, 'Software Upgrade', '', '2023-04-01', '2023-04-01'),
(1, 8, 1, 'Website Migration', '', '2023-05-06', '2023-05-06'),
(1, 5, 2, 'Network Configuration', '', '2023-05-08', '2023-05-08'),
(1, 7, 1, 'Plugin Update', '', '2023-05-10', '2023-05-10'),
(1, 5, 3, 'Product Launch', '', '2023-05-15', '2023-05-15'),
(1, 6, 2, 'User Testing', '', '2023-05-18', '2023-05-18'),
(1, 5, 3, 'API Integration', '', '2023-05-22', '2023-05-22'),
(1, 8, 1, 'Payment Gateway Setup', '', '2023-05-25', '2023-05-25'),
(1, 5, 2, 'Backup and Recovery', '', '2023-05-28', '2023-05-28'),
(1, 7, 3, 'User Interface Improvement', '', '2023-05-30', '2023-05-30'),
(1, 6, 1, 'Performance Tuning', '', '2023-06-02', '2023-06-02'),
(1, 5, 2, 'Domain Renewal', '', '2023-06-05', '2023-06-05'),
(1, 7, 3, 'SSL Certificate Installation', '', '2023-06-08', '2023-06-08'),
(1, 8, 1, 'Code Refactoring', '', '2023-06-12', '2023-06-12'),
(1, 5, 2, 'User Experience Review', '', '2023-06-15', '2023-06-15'),
(1, 7, 3, 'Load Testing', '', '2023-06-18', '2023-06-18'),
(1, 6, 1, 'Accessibility Audit', '', '2023-06-22', '2023-06-22'),
(1, 5, 2, 'Server Scaling', '', '2023-06-25', '2023-06-25'),
(1, 5, 1, 'Database Migration', '', '2023-06-28', '2023-06-28'),
(1, 7, 2, 'Keyword Research', '', '2023-06-30', '2023-06-30'),
(1, 5, 3, 'API Documentation', '', '2023-07-03', '2023-07-03'),
(1, 6, 1, 'Code Review', '', '2023-07-06', '2023-07-06'),
(1, 5, 2, 'A/B Testing', '', '2023-07-10', '2023-07-10'),
(1, 8, 3, 'System Monitoring', '', '2023-07-12', '2023-07-12'),
(1, 7, 1, 'Data Analysis', '', '2023-07-15', '2023-07-15'),
(1, 7, 2, 'Bug Tracking', '', '2023-07-18', '2023-07-18'),
(1, 6, 3, 'User Onboarding', '', '2023-07-22', '2023-07-22'),
(1, 5, 1, 'Performance Monitoring', '', '2023-07-25', '2023-07-25');

-- TODO: GENERATE DEFAULT VALUES

-- GENERATE ROLES
-- 1. client - a user who avails of the service
-- 2. sales - a user who manages sales-related concerns
-- 3. billing - a user who handles billing and invoicing
-- 4. collection - a user who manages collections and payments
-- 5. treasury - a user who oversees financial operations
-- 6. admin - a user who has full access and control over the system

-- TODO:

-- GENERATE STATUS
-- 1. pending - a ticket that is waiting to be resolved
-- 2. closed - a ticket that has been resolved and closed

-- TODO:

-- GENERATE PRIORITIES
-- 1. high - a ticket that requires immediate attention and resolution
-- 2. medium - a ticket that needs to be resolved in a reasonable amount of time
-- 3. low - a ticket that can be addressed at a later time


