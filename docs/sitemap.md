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

## 5. Navigation

### Public Navigation

- Home
- About
- Services
- Projects
- Testimonials
- Contact
- WhatsApp CTA

### Admin Navigation

- Dashboard
- Company Profile
- Services
- Projects
- Testimonials
- Inquiries
- Settings
- Logout

## 6. Notes

- Public project detail pages use SEO-friendly slugs.
- Admin routes must be protected by authentication.
- Public navigation should be responsive on mobile devices.
- The WhatsApp CTA should remain easily accessible from public pages.