# Denver Build — ERD

## 1. Overview

The Denver Build MVP uses a relational database to manage administrators, company information, services, projects, project images, testimonials, and visitor inquiries.

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

For MVP, only one CompanyProfile record is expected.

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

Stores messages submitted through the contact form.

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
Deleting a project should also remove its associated ProjectImage database records.
Cloudinary asset deletion should be handled by application logic.

## 4. Entity Relationship Diagram

```text
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
```

## 5. Constraints

### 5.1 User

- email must be unique.
- role defaults to ADMIN.

### 5.2 Service

- slug must be unique.
- displayOrder should default to 0.
- isActive should default to true.

### 5.3 Project

- slug must be unique.
- isFeatured should default to false.
- isPublished should default to false.

### 5.4 ProjectImage

- projectId is required.
- images are deleted from the database when their parent Project is deleted.

### 5.5 Testimonial

- rating may be nullable.
- rating should be between 1 and 5 when provided.
- isActive should default to true.

### 5.6 Inquiry

- status defaults to NEW.
- email is required.
- phone may be nullable.

## 6. Suggested Enums

### 6.1 UserRole

ADMIN

### 6.2 InquiryStatus

NEW
CONTACTED
CLOSED

## 7. MVP Notes

The MVP deliberately avoids unnecessary relationships.

For example:

- Services do not require categories.
- Testimonials are not linked to projects.
- Inquiries are not linked to user accounts.
- CompanyProfile is treated as singleton content.
- Projects use a simple string category instead of a separate category table.

These decisions keep the first version simple while still allowing future expansion.