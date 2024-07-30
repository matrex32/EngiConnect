Engiconnect is a social networking platform designed specifically for engineers and engineering students. It provides a space for professional interaction, information exchange, and career opportunities. The platform aims to connect professionals from various engineering fields, facilitating collaboration, continuous learning, and career development.

Technology Stack and Implementation
Engiconnect is built using a modern technology stack to ensure a robust and efficient user experience. The backend is developed with Java Spring, a powerful framework for building enterprise-level applications. The frontend is created using React, providing a dynamic and responsive user interface.

Database Management
The platform utilizes MySQL as the database management system, ensuring reliable storage and retrieval of user data and content. Flyway is used for database migrations, allowing for smooth updates and version control of the database schema.

Unified Application Architecture
Engiconnect is designed as a cohesive application, where the frontend and backend are integrated into a single deployable unit. This means that users do not need to run a separate React server for the frontend; instead, launching the Spring server handles both the backend and frontend. This unified approach simplifies deployment and ensures a seamless experience for both developers and users.

Main Features
1. Registration and Authentication
    - Users can create a new account by filling out a registration form
    - Secure authentication system for account access.
    - Password reset functionality in case of forgotten passwords.
2. Account Settings
    - Personal Information: Users can add or update personal information such as name, address or contact details.
    - Profile Picture: Option to upload a profile picture for easier identification.
    - Change Password: Users can change their account password at any time.
    - Account Deletion: If a user wishes to delete their account, it will be deactivated immediately and permanently deleted after 7 days, providing a period for reconsideration.
    - Users can upload CVs, which can be viewed by employers or other interested users.
3. Content Interaction
    - Posts: Users can create and publish posts about their projects, ideas, technical articles, or any other relevant content.
    - Likes and Comments: The ability to like and comment on other users' posts, facilitating discussions and feedback.
    - User Search: Users have the ability to search for other users on the platform, making it easier to find and connect with specific individuals.
4. Document Uploads
    - The option to upload technical documents, guides, manuals, or other educational resources to support learning and development in the engineering field.
5. Career Opportunities
   - Job Applications: Users can search for and apply to various job postings from companies.
   - Job Postings: Companies and employers can post job offers, describing available positions and requirements for candidates.
6. Integrated Email System
   - Account Creation Confirmation: An email is sent to new users to confirm the creation of their account.
   - Job Application Notifications: Users receive an email notification when they apply for a job.
   - Employer Notifications: When an applicant applies for a job, the employer receives an email with the applicant's CV, ensuring easy access to candidate information.
   - Reset password: When a user wants to reset their password, they will receive a link in their e-mail that will redirect them to the password reset page.
