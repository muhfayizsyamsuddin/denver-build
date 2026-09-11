# Denver Build — ERD

## 1. Overview

The Denver Build application uses a relational database to manage administrators, company information, services, projects, project images, testimonials, visitor inquiries, and global website settings.

Database:

- PostgreSQL
- Prisma ORM

---

## 2. Entities

### User

Stores administrator account information.

Fields:

- id
- name
- email
- password
- role
- createdAt
- updatedAt

Role:

- ADMIN

---

### CompanyProfile

Stores general company information displayed on the public website.

Fields:

- id
- companyName
- description
- history
- vision
- mission
- address
- phone
- whatsapp
- email
- googleMapsUrl
- instagramUrl
- facebookUrl
- linkedinUrl
- createdAt
- updatedAt

Only one CompanyProfile record is expected.

---

### Service

Stores services provided by the company.

Fields:

- id
- name
- slug
- description
- imageUrl
- icon
- displayOrder
- isActive
- createdAt
- updatedAt

---

### Project

Stores company portfolio projects.

Fields:

- id
- title
- slug
- shortDescription
- description
- category
- location
- completionYear
- thumbnailUrl
- isFeatured
- isPublished
- createdAt
- updatedAt

---

### ProjectImage

Stores gallery images associated with a project.

Fields:

- id
- projectId
- imageUrl
- altText
- displayOrder
- createdAt
- updatedAt

---

### Testimonial

Stores customer testimonials.

Fields:

- id
- clientName
- clientRole
- clientCompany
- content
- clientPhotoUrl
- rating
- isActive
- createdAt
- updatedAt

---

### Inquiry

Stores messages submitted through the public contact form.

Fields:

- id
- name
- email
- phone
- subject
- message
- status
- createdAt
- updatedAt

Inquiry statuses:

- NEW
- CONTACTED
- CLOSED

---

### SiteSettings

Stores global website and SEO configuration.

Fields:

- id
- siteTitle
- siteDescription
- defaultMetaTitle
- defaultMetaDescription
- defaultOgImageUrl
- faviconUrl
- whatsappMessage
- createdAt
- updatedAt

Only one SiteSettings record is expected.

---

## 3. Relationships

### Project → ProjectImage

One project can have multiple gallery images.

```text
Project
   1
   │
   │
   *
ProjectImage
```
Relationship:

Project 1 ───── * ProjectImage

A ProjectImage belongs to exactly one Project.

Deleting a Project also removes its associated ProjectImage database records through cascade behavior.

Cloudinary assets are managed separately from database records.

## 4. Entity Relationship Diagram

┌──────────────────────┐
│        User          │
├──────────────────────┤
│ id                   │
│ name                 │
│ email                │
│ password             │
│ role                 │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│   CompanyProfile     │
├──────────────────────┤
│ id                   │
│ companyName          │
│ description          │
│ history              │
│ vision               │
│ mission              │
│ address              │
│ phone                │
│ whatsapp             │
│ email                │
│ googleMapsUrl        │
│ instagramUrl         │
│ facebookUrl          │
│ linkedinUrl          │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│       Service        │
├──────────────────────┤
│ id                   │
│ name                 │
│ slug                 │
│ description          │
│ imageUrl             │
│ icon                 │
│ displayOrder         │
│ isActive             │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│       Project        │
├──────────────────────┤
│ id                   │
│ title                │
│ slug                 │
│ shortDescription     │
│ description          │
│ category             │
│ location             │
│ completionYear       │
│ thumbnailUrl         │
│ isFeatured           │
│ isPublished          │
│ createdAt            │
│ updatedAt            │
└──────────┬───────────┘
           │ 1
           │
           │ *
┌──────────▼───────────┐
│     ProjectImage     │
├──────────────────────┤
│ id                   │
│ projectId            │
│ imageUrl             │
│ altText              │
│ displayOrder         │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│     Testimonial      │
├──────────────────────┤
│ id                   │
│ clientName           │
│ clientRole           │
│ clientCompany        │
│ content              │
│ clientPhotoUrl       │
│ rating               │
│ isActive             │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│       Inquiry        │
├──────────────────────┤
│ id                   │
│ name                 │
│ email                │
│ phone                │
│ subject              │
│ message              │
│ status               │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘


┌──────────────────────┐
│    SiteSettings      │
├──────────────────────┤
│ id                   │
│ siteTitle            │
│ siteDescription      │
│ defaultMetaTitle     │
│ defaultMetaDescription│
│ defaultOgImageUrl    │
│ faviconUrl           │
│ whatsappMessage      │
│ createdAt            │
│ updatedAt            │
└──────────────────────┘

## 5. Constraints

### User

- email must be unique.
- role defaults to ADMIN.

### CompanyProfile

- Only one CompanyProfile record is expected in the application.

### Service

- slug must be unique.
- displayOrder defaults to 0.
- isActive defaults to true.
- imageUrl may be nullable.
- icon may be nullable.

### Project

- slug must be unique.
- isFeatured defaults to false.
- isPublished defaults to false.
- thumbnailUrl may be nullable.

### ProjectImage

- projectId is required.
- A ProjectImage belongs to one Project.
- ProjectImage records are removed when their parent Project is deleted.

### Testimonial

- clientRole may be nullable.
- clientCompany may be nullable.
- clientPhotoUrl may be nullable.
- rating may be nullable.
- rating must be between 1 and 5 when provided.
- isActive defaults to true.

### Inquiry

- status defaults to NEW.
- email is required.
- phone may be nullable.

### SiteSettings

- Only one SiteSettings record is expected.
- defaultOgImageUrl may be nullable.
- faviconUrl may be nullable.
- whatsappMessage may be nullable.

## 6. Enums

### UserRole

ADMIN

### InquiryStatus

NEW
CONTACTED
CLOSED

## 7. Design Notes

The database intentionally avoids unnecessary relationships.

Examples:

Services do not require categories.
Testimonials are not linked directly to projects.
Inquiries are not linked to user accounts.
CompanyProfile is treated as singleton content.
SiteSettings is treated as singleton configuration.
Projects use a string category instead of a separate category table.

These decisions keep the application simple while preserving room for future expansion.