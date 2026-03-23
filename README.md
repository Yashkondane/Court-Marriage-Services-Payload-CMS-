# Court Marriage Services - Legal CMS

A professional, block-based Content Management System (CMS) built for **Court Marriage Services**. Powered by **Next.js 15 (App Router)** and **Payload CMS v3**, this platform allows administrators to build complex legal landing pages, manage lead submissions, and scale location-based SEO.

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **CMS**: [Payload CMS v3](https://payloadcms.com/) (Headless, TypeScript-first)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Media Storage**: [S3-Compatible Storage (Supabase)](https://supabase.com/docs/guides/storage)

## ✨ Key Features

- **Dynamic Page Builder**: Stacks "Blocks" to create unique layouts for Home, About, and Landing pages.
- **Location & Service Targeting**: Dedicated collections for Locations (e.g., Delhi, Mumbai) and Services (e.g., Court Marriage, Divorce Law).
- **Lead Generation**: Managed `Leads` collection to track inquiries from the site's contact forms.
- **SEO Ready**: Granular SEO controls for every page, including Meta Titles, Descriptions, and OG Images.
- **Drafts & Versions**: Full version history and draft support for all content.

## 🧱 CMS Blocks (The Page Builder)

Use the `Layout` field in any Page to add and reorder these sections:

1.  **Hero**: Large banner with background image, headline, and primary/secondary CTAs.
2.  **Rich Content**: Prose-ready text area with full formatting (Lexical).
3.  **Services Carousel**: Dynamic slider of associated service links.
4.  **CTA (Call to Action)**: High-impact banner for bookings or phone calls.
5.  **Highlights**: Grid of features or "Why Choose Us" items.
6.  **FAQ**: Accordion list of frequently asked questions.
7.  **Testimonials**: Social proof grid or slider from across the site.
8.  **Gallery**: Visual showcase for certificates or success stories.
9.  **Blog/News Feeds**: Automatically pull the latest posts from specific categories.
10. **Logos**: Trusted partner or certification logos.
11. **Code Snippet**: Insert custom HTML/JS (e.g., CRM widgets, Google Maps).

## 🗄️ Collections Overview

- **Pages**: Core web pages (e.g., home, contact-us).
- **Services**: Legal categories (e.g., *Property Law*).
- **Locations**: Regional tags (e.g., *Lawyers in Delhi*).
- **Leads**: Secure storage for incoming form submissions.
- **Blogs/News**: Informational content and updates.
- **Media**: Centralized library for images and documents.

## 🛠️ Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file with:
    - `DATABASE_URI`: Your Postgres connection string.
    - `PAYLOAD_SECRET`: A random string for encryption.
    - `NEXT_PUBLIC_SITE_URL`: `http://localhost:3000`
    - S3 Credentials (Access Key, Secret, Bucket, Endpoint, Region) for Media.

3.  **Run Dev Server**:
    ```bash
    npm run dev
    ```

4.  **Access Admin Dashboard**:
    Visit `http://localhost:3000/admin` to manage content.

## 📝 Scripts

- `npm run dev`: Start Next.js and Payload in development mode.
- `npm run build`: Production build of the application.
- `npm run generate:types`: Update the `payload-types.ts` based on schema changes.
