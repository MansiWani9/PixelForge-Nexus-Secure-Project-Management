# PixelForge-Nexus-Secure-Project-Management
**1. Introduction**
"PixelForge Nexus" is a secure, scalable, and modular role-based project management system specifically designed to meet the collaboration needs of game development teams. The platform allows teams to efficiently manage projects, assign roles, share project-related documents, and streamline communication—while ensuring strong security measures throughout the lifecycle of development and usage. With an emphasis on a "secure-by-design" architecture, PixelForge Nexus was created using best practices in secure software development, incorporating principles like authentication, access control, secure data handling, and encrypted storage from the ground up.
This report documents the planning, design, implementation, and testing of the system and reflects on the secure development methodologies employed. The platform was developed with guidance and support from a Large Language Model (LLM), primarily ChatGPT, ensuring a balance of productivity and best-practice compliance.

**2. Development Lifecycle Stages
2.1 Specification**
The initial step involved gathering requirements from the client brief provided by Creative SkillZ LLC. The specification aimed to support three distinct user roles—Admin, Project Lead, and Developer—each with specific responsibilities and access privileges. The system had to support the following key capabilities:
•	Authentication: Secure login for all users.
•	Role-based Access Control (RBAC): Fine-grained access rights for each user role.
•	User Management: Admins should manage users and assign roles.
•	Project Management: Create, track, update, and complete projects.
•	Team Assignment: Leads should assign developers to projects.
•	Document Management: Upload/view/download project-related documents securely.
•	Profile Management: Users should be able to update their own passwords.
**2.2 Design**
The system design was created with security as a primary objective. Key security principles such as least privilege, secure defaults, and fail-safe mechanisms were incorporated. The architecture follows the Model-View-Controller (MVC) pattern for backend development and component-based design in React for the frontend.
Database Design:
MongoDB, a NoSQL document database, was selected for its flexibility. Collections were defined for Users, Projects, and Documents. Mongoose ODM was used to enforce schema structure and validation.
RBAC Implementation:
RBAC was implemented using custom middleware in Express.js, verifying JWT tokens and inspecting role claims in API calls to restrict access to protected routes.

**3. Technical Stack**
**3.1 Frontend**
•	React.js: Enables a responsive and dynamic single-page interface.
•	Tailwind CSS: Used for rapid, utility-based styling.
•	Zustand: Lightweight state management for managing user authentication and UI state.
•	Axios: Facilitates secure API communication with token headers.
•	React Router DOM: For client-side route management.
•	React-hot-toast: Provides accessible user notifications.
•	Lucide React: Offers consistent iconography across the UI.
**3.2 Backend**
•	Node.js and Express.js: Handle HTTP requests and serve APIs.
•	Mongoose: Interacts with MongoDB while enforcing validation.
•	bcryptjs: Hashes passwords using a secure one-way hashing algorithm.
•	jsonwebtoken (JWT): Creates and verifies secure tokens for session management.
•	multer: Handles file uploads securely, preventing malicious file injections.
•	cors & dotenv: Ensures secure cross-origin requests and encrypted config management.

**4. Key Features and Implementation
4.1 Authentication and Security**
All passwords are hashed using bcryptjs before storing in the database. During login, the system compares the hash instead of the plain password, ensuring protection against brute-force and credential-stuffing attacks.
JWT tokens are used to manage sessions. Each token includes the user ID and role, and is verified on each request to protected routes. Tokens expire after a set time, reducing risk from token hijacking.
An optional Multi-Factor Authentication (MFA) was considered but left out of the prototype for simplicity. It’s documented as a future enhancement.

**4.2 Role-Based Access Control (RBAC)**
RBAC was implemented using middleware functions that check the role field decoded from the JWT. Access to routes like POST /api/users, PUT /api/projects/:id, or DELETE /api/documents/:id is restricted based on the role (admin, lead, or developer). This ensures each user only has the permissions intended.
Example:
•	Admins: Can manage users, create/edit/delete any project, upload documents to any project.
•	Project Leads: Can upload documents and assign team members to projects they lead.
•	Developers: Can only view assigned projects and associated documents.

**4.3 Project Management**
Admins can create, edit, delete, or complete projects. Projects are defined with metadata including name, description, deadline, and current status (active or completed). Admins can assign a Project Lead when creating or updating a project.
Leads can view and manage only their assigned projects and add developers to them. This assignment is also role-restricted using backend checks.

**4.4 Document Management**
Users with proper privileges can upload documents linked to a project. These include:
•	Binary file uploads (images, PDFs, text files)
•	External URLs (e.g., Google Drive, Figma)
Each upload is stored securely with a link to the project ID and uploaded by user. Access is filtered so that only project-assigned users can view or download the files.
Uploaded files are stored with Multer’s disk storage configuration, and filenames are sanitized to prevent directory traversal or script injection.

**4.5 Profile and Password Management**
Users can update their own passwords from the profile settings. Password updates go through hashing again before being saved to the database. This ensures no password is ever stored or transmitted in plain text.

**5. System Setup and Deployment
Cloning and Installation**
To install and run the application locally:
git clone https://github.com/Roshan-504/PixelForge-Nexus-Secure-Project-Management.git
cd PixelForge-Nexus-Secure-Project-Management
Backend Setup
cd backend
npm install
Create .env file:
PORT=5000
MONGO_URI="mongodb+srv://..."
JWT_SECRET="your_jwt_secret"
FRONTEND_URL="http://localhost:3000"
Run backend:
npm run dev


**Frontend Setup**
cd ../frontend
npm install
npm run dev
Open http://localhost:5173 in browser.

**6. Testing and Security Evaluation**
Security testing was conducted using both manual and automated techniques:
•	Input validation: Forms were tested against XSS and injection attacks.
•	Role abuse: Attempts to access unauthorized API endpoints returned 403 Forbidden.
•	File upload sanitization: Only safe file types are accepted and stored securely.
•	Session security: JWTs are stored and transmitted securely; sessions are stateless.
Tools used:
•	OWASP ZAP for endpoint scanning
•	Postman for API testing
•	Manual tests for logic errors and privilege escalation
________________________________________
**7. Formal Methods Application**
Behavioral Modeling
Finite State Machines were used to model:
•	User login/logout flow
•	Project state transitions (Active → Completed)
•	Role transitions and assignment logic
Verification
Role-based access control was verified by checking role guards on protected backend routes using automated unit tests.
Future enhancement: Integration of Alloy or TLA+ to verify security properties like “only Admin can delete a project”.

**8. Login Credentials for Testing**
Role	Email	Password
Admin	admin@gmail.com	admin
Project Lead	lead@gmail.com	lead
Developer	developer@gmail.com	developer

**9. Assumptions Made**
•	Users do not self-register; Admin is the only one who can add new users.
•	MFA is not implemented but considered for future integration.
•	Only limited file types are allowed for uploads (no executable files).
•	Environment variables are used securely and are not hardcoded.

**10. Conclusion**
PixelForge Nexus demonstrates the potential for secure-by-design systems tailored for collaborative environments. With clear privilege separation, secure document handling, and thoughtful authentication mechanisms, the system ensures both usability and security.
The use of an LLM like ChatGPT significantly improved development efficiency by generating secure boilerplate, validating architectural decisions, and assisting with debugging. The project provides a strong base for future enhancements like MFA, project versioning, and real-time collaboration tools.
