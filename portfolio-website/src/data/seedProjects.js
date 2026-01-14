export const projects = [
  {
    title: "PlanMint",
    subtitle: "MERN stack project platform for small teams",
    description: "Clean, fast project platform with opinionated guardrails: owners/admins control membership and project status; members focus on assigned work. Crisp UI with clear roles and scoped permissions keeps teams aligned and reduces context switching.",
    fullDescription: `PlanMint is a streamlined project management platform designed for small teams who want clarity without complexity. 

**Key Features:**
- Role-based access: Owners, Admins, and Members with clear permissions
- Project lifecycle management: Planning, Active, Completed, Archived
- Task assignment and tracking
- Real-time updates and notifications
- Clean, intuitive interface focused on productivity

**Technical Highlights:**
- JWT-based authentication with refresh tokens
- MongoDB with optimized queries and indexes
- React with Context API for state management
- Responsive design with mobile-first approach
- Comprehensive error handling and validation`,
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt.js", "React Router", "React Icons"],
    category: "Web Development",
    tags: ["fullstack", "mern", "project-management", "authentication"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    status: "completed",
    likes: 0,
    views: 0,
    images: [],
  },
  {
    title: "VoteVerse",
    subtitle: "Secure, modern online voting platform",
    description: "User registration, OTP verification via email, election participation, and one-vote-per-election enforcement with responsive UI. End-to-end authentication and integrity: JWT auth, password hashing, and transactional vote casting.",
    fullDescription: `VoteVerse is a secure online voting platform that ensures election integrity through multiple layers of security.

**Key Features:**
- Email-based OTP verification for registration
- One-vote-per-voter-per-election enforcement
- Real-time vote counting
- Admin dashboard for election management
- Transparent voting records without compromising anonymity

**Security Measures:**
- JWT authentication with HTTP-only cookies
- Bcrypt password hashing
- Transaction-based vote casting to prevent double voting
- Rate limiting on critical endpoints
- Input validation and sanitization

**User Experience:**
- Intuitive voting interface
- Real-time election results
- Mobile-responsive design
- Accessibility features (WCAG compliant)`,
    technologies: ["React.js", "Tailwind CSS", "React Router DOM", "React Toastify", "Axios", "Node.js", "Express.js", "MongoDB", "Nodemailer", "JWT", "bcrypt"],
    category: "Web Development",
    tags: ["fullstack", "security", "authentication", "voting", "otp"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    status: "completed",
    likes: 0,
    views: 0,
    images: [],
  },
  {
    title: "EcoBloom",
    subtitle: "Full-stack e-commerce for plants",
    description: "Browse and purchase plants with cart/checkout; admin dashboard for plant & order management. Media storage and deployment suited for modern hosting workflows.",
    fullDescription: `EcoBloom is a modern e-commerce platform specializing in plant sales with a clean, nature-inspired design.

**Customer Features:**
- Product browsing with filtering and search
- Shopping cart with persistent storage
- Secure checkout process
- Order tracking and history
- Product reviews and ratings

**Admin Features:**
- Product management (CRUD operations)
- Order management and status updates
- Inventory tracking
- Customer management
- Sales analytics dashboard

**Technical Implementation:**
- Cloudinary for image storage and optimization
- MongoDB for product and order data
- JWT-based admin authentication
- Responsive design optimized for mobile shopping
- Payment gateway integration ready`,
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Cloudinary", "Tailwind CSS"],
    category: "E-commerce",
    tags: ["fullstack", "ecommerce", "cloudinary", "admin-panel"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    status: "completed",
    likes: 0,
    views: 0,
    images: [],
  },
];
