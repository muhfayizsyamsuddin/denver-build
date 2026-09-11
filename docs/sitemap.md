# Denver Build — Sitemap

## 1. Public Website

/
├── Home
├── About
├── Services
├── Projects
│   └── /projects/[slug]
├── Testimonials
└── Contact

SEO endpoints:

- /sitemap.xml
- /robots.txt

---

## 2. Admin CMS

/admin
├── Login
├── Dashboard
├── Company Profile
├── Services
│   ├── List
│   ├── Create
│   └── Edit
├── Projects
│   ├── List
│   ├── Create
│   └── Edit
├── Testimonials
│   ├── List
│   ├── Create
│   └── Edit
├── Inquiries
│   ├── List
│   └── Detail
└── Settings

---

## 3. Public Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/about` | About | Public |
| `/services` | Services | Public |
| `/projects` | Projects | Public |
| `/projects/[slug]` | Project Detail | Public |
| `/testimonials` | Testimonials | Public |
| `/contact` | Contact | Public |
| `/sitemap.xml` | Search Engine Sitemap | Public |
| `/robots.txt` | Search Engine Crawling Rules | Public |

---

## 4. Admin Routes

| Route | Page | Access |
|---|---|---|
| `/admin/login` | Admin Login | Public |
| `/admin` | Dashboard | Admin |
| `/admin/company` | Company Profile | Admin |
| `/admin/services` | Services | Admin |
| `/admin/services/new` | Create Service | Admin |
| `/admin/services/[id]/edit` | Edit Service | Admin |
| `/admin/projects` | Projects | Admin |
| `/admin/projects/new` | Create Project | Admin |
| `/admin/projects/[id]/edit` | Edit Project | Admin |
| `/admin/testimonials` | Testimonials | Admin |
| `/admin/testimonials/new` | Create Testimonial | Admin |
| `/admin/testimonials/[id]/edit` | Edit Testimonial | Admin |
| `/admin/inquiries` | Inquiries | Admin |
| `/admin/inquiries/[id]` | Inquiry Detail | Admin |
| `/admin/settings` | Settings | Admin |

---

## 5. Navigation

### Public Navigation

- Home
- About
- Services
- Projects
- Testimonials
- Contact
- Get a Quote CTA
- WhatsApp CTA

### Admin Navigation

- Dashboard
- Company Profile
- Services
- Projects
- Testimonials
- Inquiries
- Settings
- View Website
- Logout

---

## 6. Notes

- Public project detail pages use SEO-friendly slugs.
- Project detail pages are generated dynamically from database content.
- Public CMS pages are server-rendered dynamically so content updates can appear without rebuilding the application.
- Admin routes are protected by authentication and ADMIN authorization.
- Public navigation is responsive across desktop, tablet, and mobile devices.
- The WhatsApp CTA provides direct contact access using the company WhatsApp number.
- `/sitemap.xml` contains public pages and published project detail URLs.
- `/robots.txt` allows public crawling while excluding admin and API routes.