# Denver Build — User Flow

## 1. Overview

Denver Build has two main user flows:

- Public visitor flow
- Administrator CMS flow

The public website focuses on helping visitors understand the company, explore services and projects, and contact the business.

The administrator flow focuses on managing website content through the CMS.

---

## 2. Public Visitor Flow

### 2.1 Main Website Flow

```text
Visitor
  ↓
Home
  ├── About
  ├── Services
  ├── Projects
  │     ↓
  │   Project Detail
  ├── Testimonials
  └── Contact
          ↓
      Submit Inquiry
          ↓
      Confirmation
```
Visitors may also access WhatsApp directly from public pages.

## 3. Home Page Flow

```text
Home
  ↓
Hero Section
  ↓
Company Introduction
  ↓
Services Overview
  ↓
Featured Projects
  ↓
Why Choose Us
  ↓
Testimonials
  ↓
Consultation CTA
  ↓
Contact / WhatsApp
```

The main objective of the Home page is to guide visitors toward:

- Exploring services.
- Viewing completed projects.
- Contacting the company.
- Starting a WhatsApp conversation.

## 4. Services Flow

```text
Home / Navigation
        ↓
     Services
        ↓
Browse Services
        ↓
Select Relevant Service
        ↓
Contact / WhatsApp CTA
```
Visitors do not need an account to access service information.

## 5. Projects Flow

```text
Home / Navigation
        ↓
     Projects
        ↓
Browse Project List
        ↓
Select Project
        ↓
Project Detail
        ↓
View Description
        ↓
View Gallery
        ↓
Contact / Consultation CTA
```
Projects should help build trust by showing completed work.

## 6. Contact Inquiry Flow

```text
Visitor
   ↓
Contact Page
   ↓
Fill Contact Form
   ↓
Client-side Validation
   ↓
Server-side Validation
   ↓
Valid?
 ┌───────┴───────┐
No              Yes
↓                 ↓
Show Errors     Save Inquiry
                  ↓
              Status = NEW
                  ↓
          Show Success Message
```
Required fields:

- Name
- Email
- Subject
- Message

Phone number may be optional.

## 7. WhatsApp Flow

```text
Visitor
   ↓
Click WhatsApp CTA
   ↓
Open WhatsApp
   ↓
Pre-filled Message
   ↓
Visitor Sends Message
```
No inquiry record is required for direct WhatsApp communication in MVP.

## 8. Administrator Flow

### 8.1 Admin Authentication

```text
Admin
  ↓
/admin/login
  ↓
Enter Credentials
  ↓
Validate Credentials
  ↓
Valid?
 ┌───────┴───────┐
No              Yes
↓                 ↓
Show Error      Create Session
                  ↓
              Dashboard
```
Authenticated administrators should not need to log in again while their session remains valid.

### 8.2 Protected Route Flow

```text
Admin Requests Protected Route
            ↓
      Check Session
            ↓
       Authenticated?
       ┌─────┴─────┐
      No          Yes
      ↓             ↓
Redirect Login   Allow Access
```
All /admin routes except /admin/login must be protected.

## 9. Admin Dashboard Flow

```text
Login
  ↓
Dashboard
  ├── Company Profile
  ├── Services
  ├── Projects
  ├── Testimonials
  ├── Inquiries
  └── Settings
```
Dashboard summary should provide quick access to:

- Total projects.
- Total services.
- Total testimonials.
- Total inquiries.
- New inquiries.
- Recent inquiries.

## 10. Service Management Flow

### 10.1 Create Service

```text
Services
   ↓
Add Service
   ↓
Fill Form
   ↓
Validate
   ↓
Save Service
   ↓
Return to Service List
```

### 10.2 Edit Service

```text
Services
   ↓
Select Service
   ↓
Edit
   ↓
Update Form
   ↓
Validate
   ↓
Save Changes
```

### 10.3 Delete Service

```text
Services
   ↓
Select Delete
   ↓
Confirmation
   ↓
Delete Service
```
Deletion must require confirmation.

## 11. Project Management Flow

### 11.1 Create Project

```text
Projects
   ↓
Add Project
   ↓
Enter Project Information
   ↓
Upload Thumbnail
   ↓
Upload Gallery Images
   ↓
Validate
   ↓
Save Project
   ↓
Publish / Keep Draft
```

### 11.2 Edit Project

```text
Projects
   ↓
Select Project
   ↓
Edit
   ↓
Update Information
   ↓
Manage Images
   ↓
Save Changes
```

### 11.3 Delete Project

```text
Projects
   ↓
Delete
   ↓
Confirmation
   ↓
Delete Project
   ↓
Delete Related Media if Required
```

## 12. Testimonial Management Flow

```text
Testimonials
     ↓
Create / Edit / Delete
     ↓
Validate Data
     ↓
Save Changes
```
Administrator may also activate or deactivate testimonials.

## 13. Inquiry Management Flow

```text
Visitor Submits Contact Form
            ↓
       Inquiry Created
            ↓
        Status = NEW
            ↓
Admin Opens Inquiries
            ↓
View Inquiry Detail
            ↓
Contact Customer
            ↓
Status = CONTACTED
            ↓
Issue Completed
            ↓
Status = CLOSED
```
Inquiry status transitions:

```text
NEW
 ↓
CONTACTED
 ↓
CLOSED
```
For MVP, reopening or advanced workflow rules are not required.

## 14. Company Profile Management Flow

```text
Dashboard
   ↓
Company Profile
   ↓
Edit Company Information
   ↓
Validate
   ↓
Save
   ↓
Public Website Uses Updated Data
```
Managed information includes:

- Company name.
- Description.
- Vision.
- Mission.
- Address.
- Phone.
- WhatsApp.
- Email.
- Google Maps URL.
- Social media links.

## 15. Logout Flow

```text
Admin
  ↓
Logout
  ↓
Destroy Session
  ↓
Redirect to /admin/login
```

## 16. MVP Flow Principles

- Public users do not require accounts.
- CMS access is restricted to administrators.
- Content changes should be reflected on the public website.
- Destructive admin actions require confirmation.
- Forms require server-side validation.
- Visitor contact actions should remain simple and fast.