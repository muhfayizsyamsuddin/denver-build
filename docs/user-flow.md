# Denver Build — User Flow

## 1. Overview

Denver Build has two main user flows:

- Public visitor flow.
- Administrator CMS flow.

The public website focuses on helping visitors understand the company, explore services and projects, review testimonials, and contact the business.

The administrator flow focuses on securely managing website content through the CMS.

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

Home
  ↓
Hero Section
  ↓
Company Introduction
  ↓
Services Overview
  ↓
Why Choose Us
  ↓
Featured Projects
  ↓
Testimonials
  ↓
Consultation CTA
  ↓
Contact / WhatsApp

The main objective of the Home page is to guide visitors toward:

- Exploring services.
- Viewing completed projects.
- Contacting the company.
- Starting a WhatsApp conversation.

## 4. Services Flow
Home / Navigation
        ↓
     Services
        ↓
Browse Services
        ↓
Choose Relevant Service
        ↓
Contact / Consultation / WhatsApp

Visitors do not need an account to access service information.

Services are presented as informational content and do not require separate service detail pages in version 1.0.

## 5. Projects Flow
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

Projects help build trust by presenting completed work, project details, and gallery images.

Only published projects are displayed publicly.

## 6. Contact Inquiry Flow

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

Required fields:

- Name.
- Email.
- Subject.
- Message.

Phone number may be optional.

Submitted inquiries are stored in PostgreSQL.

## 7. WhatsApp Flow

Visitor
   ↓
Click WhatsApp CTA
   ↓
Open WhatsApp
   ↓
Pre-filled Message
   ↓
Visitor Sends Message

Direct WhatsApp communication does not create an Inquiry record.

## 8. Administrator Flow

### 8.1 Admin Authentication

Admin
  ↓
/admin/login
  ↓
Enter Credentials
  ↓
Validate Credentials
  ↓
Verify Password
  ↓
Valid ADMIN?
 ┌───────┴───────┐
No              Yes
↓                 ↓
Show Error      Create JWT Session
                  ↓
              Dashboard

Authenticated administrators do not need to log in again while their session remains valid.

### 8.2 Protected Route Flow

Admin Requests Protected Route
            ↓
      Check Session
            ↓
       Authenticated?
       ┌─────┴─────┐
      No          Yes
      ↓             ↓
Redirect Login   Check ADMIN Role
                      ↓
                  Authorized?
                 ┌────┴────┐
                No         Yes
                ↓           ↓
             Deny Access  Allow Access

All /admin routes except /admin/login are protected.

Admin API endpoints also require authenticated ADMIN access.

## 9. Admin Dashboard Flow

Login
  ↓
Dashboard
  ├── Company Profile
  ├── Services
  ├── Projects
  ├── Testimonials
  ├── Inquiries
  ├── Settings
  └── View Website

Dashboard summary provides quick access to:

- Total projects.
- Total services.
- Total testimonials.
- Total inquiries.
- New inquiries.
- Recent inquiries.

## 10. Service Management Flow

### 10.1 Create Service

Services
   ↓
Add Service
   ↓
Fill Form
   ↓
Upload Image (optional)
   ↓
Validate
   ↓
Save Service
   ↓
Return to Service List

### 10.2 Edit Service

Services
   ↓
Select Service
   ↓
Edit
   ↓
Update Information
   ↓
Replace Image if Needed
   ↓
Validate
   ↓
Save Changes

### 10.3 Delete Service

Services
   ↓
Select Delete
   ↓
Confirmation
   ↓
Delete Service Record

Deletion requires confirmation.

## 11. Project Management Flow

### 11.1 Create Project

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

### 11.2 Edit Project

Projects
   ↓
Select Project
   ↓
Edit
   ↓
Update Information
   ↓
Manage Thumbnail
   ↓
Manage Gallery Images
   ↓
Save Changes

### 11.3 Delete Project

Projects
   ↓
Delete
   ↓
Confirmation
   ↓
Delete Project
   ↓
Delete Related ProjectImage Records

Deleting a Project removes its related ProjectImage database records.

Cloudinary assets are managed separately from database deletion.

## 12. Testimonial Management Flow

Testimonials
     ↓
Create / Edit / Delete
     ↓
Upload Client Photo (optional)
     ↓
Set Rating
     ↓
Set Active Status
     ↓
Validate Data
     ↓
Save Changes

Only active testimonials are displayed publicly.

## 13. Inquiry Management Flow

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

Inquiry status progression:

NEW
 ↓
CONTACTED
 ↓
CLOSED

Advanced workflow rules or reopening are not required for version 1.0.

## 14. Company Profile Management Flow

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
Database Updated
   ↓
Public Website Displays Updated Content

Managed information includes:

- Company name.
- Description.
- History.
- Vision.
- Mission.
- Address.
- Phone.
- WhatsApp.
- Email.
- Google Maps URL.
- Social media links.

## 15. Site Settings Flow

Dashboard
   ↓
Settings
   ↓
Update General Settings
   ↓
Update SEO Metadata
   ↓
Upload OG Image / Favicon
   ↓
Update WhatsApp Message
   ↓
Validate
   ↓
Save Settings
   ↓
Public Website Uses Updated Configuration

Managed settings include:

- Site title.
- Site description.
- Default meta title.
- Default meta description.
- Default Open Graph image.
- Favicon.
- Default WhatsApp message.

## 16. Media Upload Flow

Admin Selects Image
        ↓
Validate File Type / Size
        ↓
Upload to Cloudinary
        ↓
Receive Image URL
        ↓
Store URL in CMS Form / Database
        ↓
Display Image on Public Website

Media uploads are used for:

- Services.
- Project thumbnails.
- Project galleries.
- Testimonial photos.
- Open Graph images.
- Favicon.

## 17. Logout Flow

Admin
  ↓
Logout
  ↓
Destroy Session
  ↓
Redirect to /admin/login

## 18. Version 1.0 Flow Principles

- Public users do not require accounts.
- CMS access is restricted to authenticated administrators.
- Admin API access requires ADMIN authorization.
- Public content is retrieved dynamically from the database.
- Content changes can appear without rebuilding the application.
- Destructive admin actions require confirmation.
- Forms use server-side validation.
- Uploaded media is validated before storage.
- Visitor contact actions remain simple and fast.