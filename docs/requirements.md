# Denver Build — Requirements

## 1. Project Overview

Denver Build is a modern company profile website with an integrated Content Management System (CMS) for a construction and building services company.

The platform is designed to allow visitors to explore company information, services, completed projects, testimonials, and contact information, while enabling administrators to manage website content without modifying source code.

The project is intended to serve as a reusable freelance template for small and medium businesses that need a professional company profile website with content management capabilities.

---

## 2. Project Goals

The main goals of Denver Build are to:

- Provide a professional and responsive company profile website.
- Present company services and completed projects clearly.
- Allow visitors to contact the company easily.
- Provide an admin CMS for managing website content.
- Support image upload and media management.
- Provide basic SEO capabilities.
- Be easy to customize and reuse for future freelance clients.
- Be deployable using Docker in a production environment.

---

## 3. Target Users

### Website Visitor

Visitors can:

- View company information.
- Browse available services.
- Browse completed projects.
- View project details and galleries.
- Read client testimonials.
- Contact the company.
- Access the company through WhatsApp.

### Administrator

Administrators can:

- Log in to the CMS.
- View dashboard information.
- Manage company profile information.
- Manage services.
- Manage projects.
- Manage project images.
- Manage testimonials.
- View and manage customer inquiries.
- Manage general website settings.

---

## 4. Public Website Requirements

### 4.1 Home Page

The home page should contain:

- Hero section.
- Company introduction.
- Services overview.
- Why Choose Us section.
- Featured projects.
- Company statistics.
- Testimonials.
- Consultation CTA.
- Contact information.

---

### 4.2 About Page

The About page should display:

- Company overview.
- Company history.
- Vision.
- Mission.
- Company values.
- Business experience or achievements.

---

### 4.3 Services Page

Visitors should be able to view available services.

Each service should contain:

- Service name.
- Description.
- Icon or image.
- Display order.
- Active/inactive status.

Example services:

- Residential Construction.
- Renovation.
- Interior Design.
- Commercial Construction.
- Building Maintenance.

---

### 4.4 Projects Page

Visitors should be able to browse completed company projects.

Each project should contain:

- Project title.
- Slug.
- Short description.
- Full description.
- Category.
- Location.
- Completion year.
- Thumbnail.
- Project gallery.
- Featured status.
- Publication status.

Visitors should be able to open a project detail page.

---

### 4.5 Testimonials

Visitors should be able to view testimonials from previous clients.

Each testimonial should contain:

- Client name.
- Client role or company.
- Testimonial content.
- Client photo (optional).
- Rating (optional).
- Display status.

---

### 4.6 Contact Page

The Contact page should contain:

- Company address.
- Phone number.
- WhatsApp number.
- Email address.
- Google Maps location.
- Contact form.
- Social media links.

The contact form should collect:

- Name.
- Email.
- Phone number.
- Subject.
- Message.

Submitted inquiries should be stored in the database.

---

## 5. Admin CMS Requirements

### 5.1 Authentication

Administrators must be able to:

- Log in securely.
- Log out.
- Access protected CMS routes.

Only authenticated administrators may access the CMS.

MVP will use a single ADMIN role.

---

### 5.2 Dashboard

The dashboard should display:

- Total projects.
- Total services.
- Total testimonials.
- Total inquiries.
- New inquiries.
- Recent inquiries.

---

### 5.3 Company Profile Management

Administrator can update:

- Company name.
- Company description.
- Vision.
- Mission.
- Address.
- Phone.
- WhatsApp.
- Email.
- Google Maps URL.
- Social media links.

---

### 5.4 Service Management

Administrator can:

- Create service.
- View services.
- Update service.
- Delete service.
- Change active status.
- Change display order.

---

### 5.5 Project Management

Administrator can:

- Create project.
- View projects.
- Update project.
- Delete project.
- Upload project thumbnail.
- Upload multiple gallery images.
- Mark project as featured.
- Publish/unpublish project.

---

### 5.6 Testimonial Management

Administrator can:

- Create testimonial.
- Update testimonial.
- Delete testimonial.
- Activate/deactivate testimonial.

---

### 5.7 Inquiry Management

Administrator can:

- View contact inquiries.
- View inquiry details.
- Change inquiry status.

Inquiry statuses:

- NEW
- CONTACTED
- CLOSED

---

## 6. Media Management

Images will be stored using Cloudinary.

The application should support:

- Image upload.
- Image replacement.
- Image deletion where required.
- Optimized images for web display.

---

## 7. SEO Requirements

The public website should support:

- Page titles.
- Meta descriptions.
- Open Graph metadata.
- Sitemap.
- Robots.txt.
- Semantic HTML.
- Responsive images.
- Friendly URLs.

Project detail pages should use slugs.

Example:

`/projects/modern-residence-makassar`

---

## 8. Responsive Design

The website must support:

- Desktop.
- Tablet.
- Mobile.

The public website should follow a mobile-first responsive design approach.

The CMS should also remain usable on tablets and mobile devices.

---

## 9. Non-Functional Requirements

### Performance

- Optimize images.
- Avoid unnecessary client-side JavaScript.
- Use appropriate Next.js rendering strategies.
- Maintain good Core Web Vitals where possible.

### Security

- Validate all input.
- Protect admin routes.
- Secure authentication sessions.
- Do not expose secrets to the client.
- Validate uploaded media.
- Apply appropriate authorization checks.

### Maintainability

- Use TypeScript.
- Maintain consistent project structure.
- Use reusable UI components.
- Validate environment variables.
- Follow consistent coding conventions.

---

## 10. Technology Stack

### Application

- Next.js
- React
- TypeScript

### Styling

- Tailwind CSS
- shadcn/ui

### Database

- PostgreSQL
- Prisma ORM

### Validation

- Zod

### Authentication

- Auth.js

### Media Storage

- Cloudinary

### Deployment

- Docker

---

## 11. Core Data Entities

The MVP will use the following entities:

- User
- CompanyProfile
- Service
- Project
- ProjectImage
- Testimonial
- Inquiry

Detailed relationships will be defined in `erd.md`.

---

## 12. MVP Scope

Version 1.0 must include:

- Public company profile website.
- Responsive design.
- Admin authentication.
- CMS dashboard.
- Company profile management.
- Service CRUD.
- Project CRUD.
- Project image gallery.
- Testimonial CRUD.
- Contact inquiry management.
- Cloudinary image upload.
- Basic SEO.
- Docker-based deployment.

---

## 13. Out of Scope for v1.0

The following are not required for the initial release:

- Multi-tenant architecture.
- Multiple admin roles.
- Customer accounts.
- Online payment.
- Live chat.
- Complex analytics.
- Multilingual support.
- Page builder.
- Theme builder.
- Mobile application.

These features may be considered for future versions.