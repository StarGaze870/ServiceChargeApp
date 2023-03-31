use service_charge;

select * from roles;
select * from status;
select * from priorities;
select * from users;
select * from invoices;
select * from tickets;
select * from otps;

INSERT INTO tickets (user_id, status_id, priority_id, subject, description, created_at, updated_at)
VALUES
(1, 5, 3, 'Website Redesign', 'Redesign the website to improve user experience and incorporate new features. Update the layout and color scheme for better accessibility.', '2023-04-12', '2023-04-12'),
(1, 7, 1, 'Server Maintenance', 'Perform routine server maintenance to ensure optimal performance and security. Update software and apply patches as needed.', '2023-04-08', '2023-04-08'),
(1, 6, 2, 'Customer Support Tickets', 'Handle customer support tickets related to account issues, technical problems, and feature requests. Provide timely and helpful responses.', '2023-04-15', '2023-04-15'),
(1, 5, 3, 'Bug Fixing', 'Identify and fix bugs in the application, including front-end display issues and back-end logic problems. Improve overall stability and performance.', '2023-04-17', '2023-04-17'),
(1, 6, 1, 'Social Media Campaign', 'Develop and execute a social media campaign to increase brand awareness and user engagement. Utilize various platforms like Facebook, Twitter, and LinkedIn.', '2023-04-20', '2023-04-20'),
(1, 5, 2, 'Content Creation', 'Create high-quality content for the website, blog, and marketing materials. Focus on topics relevant to the target audience and the app.', '2023-04-22', '2023-04-22'),
(1, 7, 3, 'Email Marketing', 'Design and implement email marketing campaigns to promote the app and engage with existing users. Monitor open rates and click-through rates for optimization.', '2023-04-05', '2023-04-05'),
(1, 8, 1, 'Database Optimization', 'Optimize the database for faster queries and better performance. Analyze query patterns and identify areas for improvement.', '2023-04-25', '2023-04-25'),
(1, 5, 2, 'Analytics Setup', 'Set up analytics tools to track user behavior and app performance. Use the collected data to make informed decisions about future updates and features.', '2023-04-28', '2023-04-28'),
(1, 7, 3, 'SEO Audit', 'Perform an SEO audit to identify areas of improvement in website structure, content, and metadata. Implement changes to improve search engine rankings.', '2023-04-02', '2023-04-02'),
(1, 6, 1, 'Security Update', 'Apply security updates to protect user data and maintain the integrity of the application. Regularly review security protocols and best practices.', '2023-04-30', '2023-04-30'),
(1, 5, 2, 'Mobile App Development', 'Develop a mobile app version of the service charge platform for better accessibility and user experience on mobile devices.', '2023-05-03', '2023-05-03'),
(1, 7, 3, 'Software Upgrade', 'Upgrade the software and related dependencies to the latest versions. Ensure compatibility with the current system and resolve any issues.', '2023-04-01', '2023-04-01'),
(1, 8, 1, 'Website Migration', 'Migrate the website to a new hosting provider for better performance, scalability, and reliability. Ensure a smooth transition with minimal downtime.', '2023-05-06', '2023-05-06'),
(1, 5, 2, 'Network Configuration', 'Configure the network infrastructure for optimal performance and security. Set up firewalls, load balancers, and other networking components.', '2023-05-08', '2023-05-08'),
(1, 7, 1, 'Plugin Update', 'Update and maintain third-party plugins used in the app to ensure compatibility and security. Address any issues or conflicts that arise.', '2023-05-10', '2023-05-10'),
(1, 5, 3, 'Product Launch', 'Plan and execute the launch of new features or services in the app. Coordinate marketing efforts and monitor user feedback.', '2023-05-15', '2023-05-15'),
(1, 6, 2, 'User Testing', 'Conduct user testing sessions to gather feedback on the app usability, design, and features. Identify areas for improvement and implement changes.', '2023-05-18', '2023-05-18'),
(1, 5, 3, 'API Integration', 'Integrate third-party APIs to enhance the app functionality and provide additional services. Ensure seamless integration and compatibility.', '2023-05-22', '2023-05-22'),
(1, 8, 1, 'Payment Gateway Setup', 'Set up a secure payment gateway to process transactions and handle billing for the app. Ensure compliance with relevant regulations and industry standards.', '2023-05-25', '2023-05-25'),
(1, 5, 2, 'Backup and Recovery', 'Implement a robust backup and recovery strategy to protect user data and ensure business continuity in the event of data loss or system failure.', '2023-05-28', '2023-05-28'),
(1, 7, 3, 'User Interface Improvement', 'Improve the user interface of the app to enhance user experience, streamline navigation, and provide a consistent look and feel.', '2023-05-30', '2023-05-30'),
(1, 6, 1, 'Performance Tuning', 'Optimize the app performance by identifying and addressing bottlenecks, improving resource usage, and reducing latency.', '2023-06-02', '2023-06-02'),
(1, 5, 2, 'Domain Renewal', 'Renew the domain registration for the app website to ensure uninterrupted access and protect the brand online presence.', '2023-06-05', '2023-06-05'),
(1, 7, 3, 'SSL Certificate Installation', 'Install and configure an SSL certificate to encrypt data transmissions and improve the security of the app and its website.', '2023-06-08', '2023-06-08'),
(1, 8, 1, 'Code Refactoring', 'Refactor the app codebase to improve maintainability, readability, and overall quality. Eliminate code duplication and simplify complex logic.', '2023-06-12', '2023-06-12'),
(1, 5, 2, 'User Experience Review', 'Conduct a comprehensive review of the app user experience to identify areas for improvement and enhance overall satisfaction.', '2023-06-15', '2023-06-15'),
(1, 7, 3, 'Load Testing', 'Perform load testing to ensure the app can handle a large number of concurrent users and maintain its performance under heavy traffic. Identify and address any bottlenecks or scalability issues.', '2023-06-18', '2023-06-18'),
(1, 6, 1, 'Accessibility Audit', 'Conduct an accessibility audit to ensure the app and its website comply with accessibility standards and provide an inclusive experience for all users.', '2023-06-22', '2023-06-22'),
(1, 5, 2, 'Server Scaling', 'Implement server scaling strategies to ensure the app can handle increased traffic and resource demands as the user base grows.', '2023-06-25', '2023-06-25'),
(1, 5, 1, 'Database Migration', 'Migrate the app database to a more scalable and robust solution to handle growing data storage and processing requirements.', '2023-06-28', '2023-06-28'),
(1, 7, 2, 'Keyword Research', 'Conduct keyword research to identify relevant search terms and optimize the app website and marketing materials for search engine visibility.', '2023-06-30', '2023-06-30'),
(1, 5, 3, 'API Documentation', 'Create comprehensive API documentation to help developers understand how to use the app APIs effectively and efficiently.', '2023-07-03', '2023-07-03'),
(1, 6, 1, 'Code Review', 'Conduct regular code reviews to maintain code quality, identify potential issues, and ensure adherence to best practices.', '2023-07-06', '2023-07-06'),
(1, 5, 2, 'A/B Testing', 'Implement A/B testing strategies to compare different design elements, features, or content in the app and make data-driven decisions.', '2023-07-10', '2023-07-10'),
(1, 8, 3, 'System Monitoring', 'Set up and maintain system monitoring tools to track the app performance, resource usage, and detect potential issues early.', '2023-07-12', '2023-07-12'),
(1, 7, 1, 'Data Analysis', 'Analyze user data and app performance metrics to identify trends, inform decision-making, and drive improvements in the app.', '2023-07-15', '2023-07-15'),
(1, 7, 2, 'Bug Tracking', 'Implement a robust bug tracking system to identify, prioritize, and resolve issues in the app. Ensure timely resolution of critical bugs.', '2023-07-18', '2023-07-18'),
(1, 6, 3, 'User Onboarding', 'Design and implement an effective user onboarding process to help new users quickly understand and navigate the app.', '2023-07-22', '2023-07-22'),
(1, 5, 1, 'Performance Monitoring', 'Monitor the app performance regularly to detect and address potential issues, optimize resource usage, and maintain a high level of user satisfaction.', '2023-07-25', '2023-07-25');

-- INSERT INTO tickets (user_id, status_id, priority_id, subject, description, created_at, updated_at)
-- VALUES
-- (1, 5, 3, 'Website Redesign', '', '2023-04-12', '2023-04-12'),
-- (1, 7, 1, 'Server Maintenance', '', '2023-04-08', '2023-04-08'),
-- (1, 6, 2, 'Customer Support Tickets', '', '2023-04-15', '2023-04-15'),
-- (1, 5, 3, 'Bug Fixing', '', '2023-04-17', '2023-04-17'),
-- (1, 6, 1, 'Social Media Campaign', '', '2023-04-20', '2023-04-20'),
-- (1, 5, 2, 'Content Creation', '', '2023-04-22', '2023-04-22'),
-- (1, 7, 3, 'Email Marketing', '', '2023-04-05', '2023-04-05'),
-- (1, 8, 1, 'Database Optimization', '', '2023-04-25', '2023-04-25'),
-- (1, 5, 2, 'Analytics Setup', '', '2023-04-28', '2023-04-28'),
-- (1, 7, 3, 'SEO Audit', '', '2023-04-02', '2023-04-02'),
-- (1, 6, 1, 'Security Update', '', '2023-04-30', '2023-04-30'),
-- (1, 5, 2, 'Mobile App Development', '', '2023-05-03', '2023-05-03'),
-- (1, 7, 3, 'Software Upgrade', '', '2023-04-01', '2023-04-01'),
-- (1, 8, 1, 'Website Migration', '', '2023-05-06', '2023-05-06'),
-- (1, 5, 2, 'Network Configuration', '', '2023-05-08', '2023-05-08'),
-- (1, 7, 1, 'Plugin Update', '', '2023-05-10', '2023-05-10'),
-- (1, 5, 3, 'Product Launch', '', '2023-05-15', '2023-05-15'),
-- (1, 6, 2, 'User Testing', '', '2023-05-18', '2023-05-18'),
-- (1, 5, 3, 'API Integration', '', '2023-05-22', '2023-05-22'),
-- (1, 8, 1, 'Payment Gateway Setup', '', '2023-05-25', '2023-05-25'),
-- (1, 5, 2, 'Backup and Recovery', '', '2023-05-28', '2023-05-28'),
-- (1, 7, 3, 'User Interface Improvement', '', '2023-05-30', '2023-05-30'),
-- (1, 6, 1, 'Performance Tuning', '', '2023-06-02', '2023-06-02'),
-- (1, 5, 2, 'Domain Renewal', '', '2023-06-05', '2023-06-05'),
-- (1, 7, 3, 'SSL Certificate Installation', '', '2023-06-08', '2023-06-08'),
-- (1, 8, 1, 'Code Refactoring', '', '2023-06-12', '2023-06-12'),
-- (1, 5, 2, 'User Experience Review', '', '2023-06-15', '2023-06-15'),
-- (1, 7, 3, 'Load Testing', '', '2023-06-18', '2023-06-18'),
-- (1, 6, 1, 'Accessibility Audit', '', '2023-06-22', '2023-06-22'),
-- (1, 5, 2, 'Server Scaling', '', '2023-06-25', '2023-06-25'),
-- (1, 5, 1, 'Database Migration', '', '2023-06-28', '2023-06-28'),
-- (1, 7, 2, 'Keyword Research', '', '2023-06-30', '2023-06-30'),
-- (1, 5, 3, 'API Documentation', '', '2023-07-03', '2023-07-03'),
-- (1, 6, 1, 'Code Review', '', '2023-07-06', '2023-07-06'),
-- (1, 5, 2, 'A/B Testing', '', '2023-07-10', '2023-07-10'),
-- (1, 8, 3, 'System Monitoring', '', '2023-07-12', '2023-07-12'),
-- (1, 7, 1, 'Data Analysis', '', '2023-07-15', '2023-07-15'),
-- (1, 7, 2, 'Bug Tracking', '', '2023-07-18', '2023-07-18'),
-- (1, 6, 3, 'User Onboarding', '', '2023-07-22', '2023-07-22'),
-- (1, 5, 1, 'Performance Monitoring', '', '2023-07-25', '2023-07-25');

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


