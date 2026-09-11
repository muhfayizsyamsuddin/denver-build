# Denver Build

Denver Build is a modern construction company website with a custom admin CMS.

The project was built as a full-stack web application for managing company information, services, projects, testimonials, inquiries, and website settings from a protected admin dashboard.

## Live Demo

Public Website:

https://denverbuild.faizms.com

Admin CMS:

https://denverbuild.faizms.com/admin/login

> Admin credentials are not included in this repository.

---

## Features

### Public Website

- Responsive company profile website
- Home page with featured project
- Company profile and company history
- Services showcase
- Project portfolio
- Project detail pages
- Project image gallery
- Client testimonials
- Contact and inquiry form
- WhatsApp contact integration
- Dynamic SEO metadata
- Open Graph configuration
- Responsive navigation
- Mobile-friendly layout

### Admin CMS

Protected admin dashboard for managing website content.

Admin features include:

- Dashboard statistics
- Company profile management
- Services CRUD
- Projects CRUD
- Project thumbnail and gallery uploads
- Testimonials CRUD
- Inquiry management
- Inquiry status management
- Website settings
- SEO metadata configuration
- Open Graph image upload
- Favicon upload
- Cloudinary media uploads
- Admin authentication
- Role-based API protection

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

- Next.js App Router
- Route Handlers
- NextAuth.js
- Zod
- bcryptjs

### Database

- PostgreSQL
- Prisma ORM 7
- Prisma PostgreSQL Adapter

### Media

- Cloudinary

### Infrastructure

- Docker
- Docker Compose
- Traefik
- GitHub Actions
- VPS deployment
- Docker Hub

---

## Architecture

```text
User
  |
  v
Traefik
  |
  v
Next.js Application
  |
  +------> Cloudinary
  |
  v
PostgreSQL
```

Production infrastructure:

Internet
   |
   v
Traefik
   |
   v
Denver Build App Container
   |
   v
Internal Docker Network
   |
   v
PostgreSQL Container

The PostgreSQL database is not exposed directly to the public internet.

## Content Management Flow

Example project update:

Admin CMS
   |
   v
Update Project
   |
   v
Admin API
   |
   v
PostgreSQL
   |
   v
Public Website

Public CMS pages use dynamic server rendering so updated content can be retrieved from the production database without rebuilding the application.

## Security

The project includes:

Password hashing using bcrypt
JWT-based sessions
Admin role authorization
Protected admin routes
Protected admin API endpoints
Environment-based secrets
Zod input validation
Internal Docker network for PostgreSQL
Database port not exposed publicly

## Responsive Design

The website is optimized for:

Mobile
Tablet
Desktop

The public website and admin dashboard use responsive layouts built with Tailwind CSS.

## Purpose

Denver Build was created as a portfolio project demonstrating the development of a production-style company website with a custom content management system.

The project demonstrates:

Full-stack development
CMS architecture
Authentication
PostgreSQL database design
File and image uploads
SEO implementation
Docker containerization
Reverse proxy configuration
CI/CD deployment
VPS production deployment

## Author

Muh. Fayiz Syamsuddin

Full-Stack Developer

Portfolio:

https://faizms.my.id

GitHub:

https://github.com/muhfayizsyamsuddin