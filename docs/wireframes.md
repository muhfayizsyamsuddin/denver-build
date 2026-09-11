# Denver Build — Wireframes

## 1. Overview

This document defines the initial layout structure for the Denver Build public website and admin CMS.

The wireframes focus on content hierarchy, navigation, and component placement. Visual styling will be defined during implementation.

---

# 2. Public Website

## 2.1 Home Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
│ Logo    Home About Services Projects Contact  │
│                                 WhatsApp CTA  │
├───────────────────────────────────────────────┤
│                                               │
│ HERO                                          │
│                                               │
│ Building Better Spaces,                       │
│ Delivering Lasting Value                      │
│                                               │
│ Short company introduction                    │
│                                               │
│ [View Projects]   [Contact Us]                │
│                                               │
├───────────────────────────────────────────────┤
│ Company Introduction                          │
│                                               │
│ Short About description + company image       │
│                                               │
│ [Learn More]                                  │
├───────────────────────────────────────────────┤
│ Our Services                                  │
│                                               │
│ [Service]  [Service]  [Service]               │
│ [Service]  [Service]                          │
│                                               │
│ [View All Services]                           │
├───────────────────────────────────────────────┤
│ Why Choose Us                                 │
│                                               │
│ Experience | Quality | Reliable | Professional│
├───────────────────────────────────────────────┤
│ Featured Projects                             │
│                                               │
│ [Project Card] [Project Card] [Project Card]  │
│                                               │
│ [View All Projects]                           │
├───────────────────────────────────────────────┤
│ Testimonials                                  │
│                                               │
│ [Testimonial] [Testimonial] [Testimonial]     │
├───────────────────────────────────────────────┤
│ Consultation CTA                              │
│                                               │
│ Have a project in mind?                       │
│ [Contact Us] [WhatsApp]                       │
├───────────────────────────────────────────────┤
│ Footer                                        │
│                                               │
│ Company | Navigation | Contact | Social       │
└───────────────────────────────────────────────┘
```

## 2.2 About Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Page Hero                                     │
│ About Denver Build                            │
├───────────────────────────────────────────────┤
│ Company Overview                              │
│                                               │
│ Image                    Description           │
├───────────────────────────────────────────────┤
│ Company History                               │
├───────────────────────────────────────────────┤
│ Vision                  Mission               │
├───────────────────────────────────────────────┤
│ Company Values                                │
│                                               │
│ [Value] [Value] [Value] [Value]               │
├───────────────────────────────────────────────┤
│ CTA                                           │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```

## 2.3 Services Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Page Hero                                     │
│ Our Services                                  │
├───────────────────────────────────────────────┤
│                                               │
│ [Service Card] [Service Card] [Service Card]  │
│                                               │
│ [Service Card] [Service Card] [Service Card]  │
│                                               │
├───────────────────────────────────────────────┤
│ Consultation CTA                              │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```
Each service card may contain:

```text
┌───────────────────────┐
│ Image / Icon          │
│                       │
│ Service Name          │
│ Short Description     │
└───────────────────────┘
```

## 2.4 Projects Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Page Hero                                     │
│ Our Projects                                  │
├───────────────────────────────────────────────┤
│ Project Filter / Categories                   │
│                                               │
│ [All] [Residential] [Commercial] [Renovation] │
├───────────────────────────────────────────────┤
│                                               │
│ [Project Card] [Project Card] [Project Card]  │
│                                               │
│ [Project Card] [Project Card] [Project Card]  │
│                                               │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```
Project card:

```text
┌────────────────────────┐
│ Project Thumbnail      │
│                        │
│ Project Name           │
│ Category               │
│ Location               │
│                        │
│ [View Project]         │
└────────────────────────┘
```

## 2.5 Project Detail Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Project Hero / Main Image                     │
├───────────────────────────────────────────────┤
│ Project Title                                 │
│                                               │
│ Category | Location | Completion Year         │
├───────────────────────────────────────────────┤
│ Project Description                           │
├───────────────────────────────────────────────┤
│ Gallery                                       │
│                                               │
│ [Image] [Image] [Image]                       │
│ [Image] [Image] [Image]                       │
├───────────────────────────────────────────────┤
│ Consultation CTA                              │
│                                               │
│ Interested in a similar project?              │
│ [Contact Us] [WhatsApp]                       │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```

## 2.6 Testimonials Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Page Hero                                     │
│ What Our Clients Say                          │
├───────────────────────────────────────────────┤
│                                               │
│ [Testimonial] [Testimonial]                   │
│                                               │
│ [Testimonial] [Testimonial]                   │
│                                               │
├───────────────────────────────────────────────┤
│ CTA                                           │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```

## 2.7 Contact Page

```text
┌───────────────────────────────────────────────┐
│ Navbar                                        │
├───────────────────────────────────────────────┤
│ Page Hero                                     │
│ Contact Us                                    │
├───────────────────────────────────────────────┤
│                                               │
│ Contact Information      Contact Form         │
│                                               │
│ Address                  Name                 │
│ Phone                    Email                │
│ WhatsApp                 Phone                │
│ Email                    Subject              │
│ Social Media             Message              │
│                          [Submit]              │
│                                               │
├───────────────────────────────────────────────┤
│ Google Maps                                   │
├───────────────────────────────────────────────┤
│ Footer                                        │
└───────────────────────────────────────────────┘
```

# 3. Admin CMS

## 3.1 Admin Login

```text
┌───────────────────────────────────────────────┐
│                                               │
│              Denver Build CMS                │
│                                               │
│          ┌─────────────────────┐              │
│          │ Email               │              │
│          │ Password            │              │
│          │                     │              │
│          │      [Login]        │              │
│          └─────────────────────┘              │
│                                               │
└───────────────────────────────────────────────┘
```

## 3.2 Admin Layout

```text
┌────────────────────────────────────────────────────────────┐
│ Topbar                                                     │
│ Arunika Build CMS                       Admin | Logout      │
├───────────────┬────────────────────────────────────────────┤
│ Sidebar       │ Main Content                               │
│               │                                            │
│ Dashboard     │                                            │
│ Company       │                                            │
│ Services      │                                            │
│ Projects      │                                            │
│ Testimonials  │                                            │
│ Inquiries     │                                            │
│ Settings      │                                            │
│               │                                            │
└───────────────┴────────────────────────────────────────────┘
```

## 3.3 Dashboard

```text
┌────────────────────────────────────────────────────────────┐
│ Dashboard                                                  │
│                                                            │
│ [12 Projects] [5 Services] [8 Testimonials] [17 Inquiries]│
│                                                            │
├────────────────────────────────────────────────────────────┤
│ Recent Inquiries                                           │
│                                                            │
│ Name      Subject         Status       Date                 │
│ ---------------------------------------------------------- │
│ Client A  Renovation      NEW          05 Sep               │
│ Client B  Construction    CONTACTED    04 Sep               │
│ Client C  Interior        CLOSED       02 Sep               │
└────────────────────────────────────────────────────────────┘
```

## 3.4 Service Management

```text
┌────────────────────────────────────────────────────────────┐
│ Services                                  [+ Add Service]  │
│                                                            │
│ Search                                                     │
│                                                            │
│ Name            Status       Order        Actions           │
│ ---------------------------------------------------------- │
│ Renovation      Active       1            Edit | Delete     │
│ Interior        Active       2            Edit | Delete     │
│ Maintenance     Inactive     3            Edit | Delete     │
└────────────────────────────────────────────────────────────┘
```
Service form:

```text
Service Name
Slug
Description
Image / Icon
Display Order
Active Status

[Cancel] [Save]
```

## 3.5 Project Management

```text
┌────────────────────────────────────────────────────────────┐
│ Projects                                  [+ Add Project]  │
│                                                            │
│ Search / Filter                                            │
│                                                            │
│ Project       Category      Status       Featured  Actions │
│ ---------------------------------------------------------- │
│ Project A     Residential   Published    Yes       Edit    │
│ Project B     Renovation    Draft        No        Edit    │
└────────────────────────────────────────────────────────────┘
```
Project form:

```text
Project Title
Slug
Short Description
Full Description
Category
Location
Completion Year
Thumbnail

Gallery Images

Featured
Published

[Cancel] [Save]
```

## 3.6 Testimonial Management

```text
┌────────────────────────────────────────────────────────────┐
│ Testimonials                          [+ Add Testimonial]  │
│                                                            │
│ Client       Company       Status       Actions            │
│ ---------------------------------------------------------- │
│ Client A     Company A     Active       Edit | Delete      │
│ Client B     Company B     Inactive     Edit | Delete      │
└────────────────────────────────────────────────────────────┘
```

## 3.7 Inquiry Management

```text
┌────────────────────────────────────────────────────────────┐
│ Inquiries                                                  │
│                                                            │
│ Status Filter: [All] [New] [Contacted] [Closed]            │
│                                                            │
│ Name       Subject          Status       Date       Action │
│ ---------------------------------------------------------- │
│ Client A   Renovation       NEW          Sep 05     View   │
│ Client B   Construction     CONTACTED    Sep 04     View   │
└────────────────────────────────────────────────────────────┘
```
Inquiry detail:

```text
Name
Email
Phone
Subject
Message
Submitted At

Status
[NEW / CONTACTED / CLOSED]

[Update Status]
```

## 3.8 Company Profile

```text
Company Name
Company Description
Company History
Vision
Mission

Address
Phone
WhatsApp
Email

Google Maps URL
Instagram URL
Facebook URL
LinkedIn URL

[Save Changes]
```

## 3.9 Site Settings

```text
┌────────────────────────────────────────────────────────────┐
│ Settings                                                   │
│ Manage global website and SEO configuration.               │
│                                                            │
│ General                                                    │
│ Site Title                                                 │
│ Site Description                                           │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ SEO                                                        │
│ Default Meta Title                                         │
│ Default Meta Description                                   │
│ Open Graph Image                                           │
│ Favicon                                                    │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ WhatsApp                                                   │
│ Default WhatsApp Message                                   │
│                                                            │
│                                            [Save Settings] │
└────────────────────────────────────────────────────────────┘
```

# 4. Responsive Considerations

## 4.1 Public Website

On mobile:

- Navigation collapses into a mobile menu.
- Multi-column sections become single-column.
- Project cards stack vertically.
- Contact layout becomes single-column.
- CTA buttons remain large enough for touch interaction.
- WhatsApp CTA remains easy to access.

## 4.2 Admin CMS

On mobile:

- Sidebar becomes a drawer.
- Tables may use horizontal scrolling or responsive card layouts.
- Forms use single-column layouts.
- Actions remain accessible on smaller screens.

# 5. Design Direction

The visual implementation should follow these principles:

- Modern and professional construction-business appearance.
- Strong typography.
- Generous whitespace.
- High-quality project imagery.
- Clear visual hierarchy.
- Consistent card and button styles.
- Mobile-first responsive design.
- Avoid excessive animation.
- Prioritize trust, clarity, and conversion.

Final visual design decisions will be implemented after the core application structure is established.