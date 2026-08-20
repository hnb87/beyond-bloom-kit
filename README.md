# Elevate & Lead Hub

Create a modern, high-converting, executive personal branding and corporate training website for "Nikhil B. Mehta - Founder & Leadership Development Strategist" under his venture "Best and Beyond Knowledge Solutions".

IMPORTANT ARCHITECTURE REQUIREMENT:
DO NOT use Supabase, Firebase, or any external cloud database/storage. Build this website to be 100% self-contained and ready for deployment on standard Hostinger hosting. 
All data must be driven by a centralized configuration file (e.g., `src/data/siteContent.ts` / `public/data/siteData.json`) with an interactive client-side Admin Panel (/admin) that allows editing data, managing content, and exporting/syncing updates locally.

---

### 1. PRELOADED BRAND DATA & CONTENT
- **Name & Title:** Nikhil B. Mehta | Founder, Trainer & Business/Leadership Development Strategist
- **Company:** Best and Beyond Knowledge Solutions
- **Tagline:** "Empowering People. Strengthening Teams. Driving Business Excellence."
- **Core Value Proposition:** "People Development with Business Purpose. Helping leaders, professionals, and teams translate learning into workplace impact."
- **Key Metrics:**
  - 18+ Years of Entrepreneurial Experience
  - 15+ Years in Training & Development
  - 6000+ People Trained Across Varied Audiences
- **Certifications & Accreditations:**
  - NLP Practitioner & NLP Master Practitioner (ABNLP, USA)
  - Train the Trainer (Success Gyan)
  - Making the Stage (Success Resources)
  - M.O.S.E. - Mastery of Self Expression (Larry Gilhman)
  - Breakthrough Coach (SK Consultancy)
  - Certified Networker Trainer (Phil Belford)
- **Institutional & Corporate Partners:**
  - Parul University, Maharaja Sayajirao University of Baroda (MSU), IIIM Jaipur, Poornima University, DICS IAS/IPS, BNI Bangalore, JCI Bangalore, Anna Adarsh College Chennai, GM Vidyaniketan Udupi, LEAP Academy Hyderabad, Sai Investments, Geetanjali Engineers, Teravon Solar Energies, Labh Property, ICFAI University.
- **Default Contact Details:**
  - Primary WhatsApp/Call: +91 98450 25061
  - Secondary Call: +91 98250 90015
  - Email: nikhil.ugp@gmail.com

---

### 2. FRONTEND PAGES & SECTION STRUCTURE

#### A. Header & Sticky Navigation
- Clean logo: "Best and Beyond Knowledge Solutions" with Nikhil Mehta badge.
- Navigation links: Home, About, Programs, Methodology, Gallery, Clients, Contact.
- CTA Button: "Connect on WhatsApp" (Direct link using dynamic WhatsApp number from site config).

#### B. Dynamic Hero Banner
- Headline, subtext, and background image/gradient editable via config/admin.
- Quick Stats Counter (18+ Yrs, 15+ Yrs, 6000+ Trained).
- Action buttons: "Explore Programs" (smooth scroll) and "Book a Workshop" (triggers WhatsApp conversation modal).

#### C. About Nikhil & 4-Pillar Philosophy
- Executive profile narrative blending business perspective with experiential behavioural learning.
- 4-Pillar framework cards:
  1. Engage (Participation, curiosity, openness)
  2. Experience (Activities, cases, role plays, practice)
  3. Apply (Connect learning to workplace situations)
  4. Transform (Sustainable behavioral habits)
- Visual credentials badge showcase.

#### D. Signature 5-Step Methodology
- Step-by-step interactive workflow: 01 Discover -> 02 Design -> 03 Engage -> 04 Apply -> 05 Reinforce.

#### E. Programs & Courses Directory (Filterable)
- Tabs: "All Programs", "Running Now", "Upcoming", "Signature Workshops".
- Pre-populated courses (editable from admin):
  1. High-Performance Professionals (Self-awareness, ownership, productivity)
  2. Leadership Excellence (Decision-making, coaching, trust, accountability)
  3. Professional Communication Mastery (Presentations, speaking, difficult conversations)
  4. Customer Experience Excellence (Customer-centric behaviours, service mindset)
  5. Sales Transformation (Consultative selling, objection handling, closing)
  6. Personal Excellence Blueprint (Habit formation, goal setting, confidence)
  7. Team Building & Collaboration (Cross-functional trust, shared purpose)
  8. Manager Effectiveness (Delegation, coaching, feedback, conflict resolution)
- Each card features: Title, status badge ('Upcoming' / 'Running'), duration, description, and an "Inquire via WhatsApp" button pre-populating that specific course title in the WhatsApp message.

#### F. Photo Gallery
- Responsive Masonry grid showcasing workshop action photos.
- Filter by category: Corporate, Campus / University, Leadership Workshops.
- Fullscreen Lightbox image viewer.

#### G. Client Social Proof
- Dynamic logo carousel/grid of corporate and university clients.
- Featured Quote: *"Organizations grow when their people grow."*

#### H. WhatsApp Lead Generation Form
- Contact fields: Full Name, Company / Designation, Contact Number, Select Program of Interest, Message.
- **Submit Behavior:** Generates an encoded WhatsApp API URL (`https://wa.me/{config_whatsapp_number}?text=...`) and opens WhatsApp directly with the inquiry pre-formatted. Also copies inquiry details to clipboard.

---

### 3. SELF-HOSTED ADMIN PANEL & CONFIG MANAGER (`/admin`)

- Accessible at `/admin` with a simple PIN / password protection (stored in localStorage / config).
- **Tab 1: General & Contact Settings**
  - Update primary & secondary WhatsApp numbers.
  - Update email address and social media URLs (LinkedIn, Facebook, Instagram, YouTube).
  - Update Hero banner headline, subtext, and hero background image path.
- **Tab 2: Manage Courses & Workshops**
  - Add, edit, or delete courses.
  - Switch course badge status between "Upcoming", "Running", and "On Demand".
- **Tab 3: Gallery Manager**
  - Add image URLs / local image paths (`/images/gallery/photo1.jpg`), assign captions and categories, or remove images.
- **Tab 4: Export & Sync Data (Self-Reliant Hostinger Sync)**
  - **Live Preview Button:** Instantly test changes across the UI in the browser.
  - **Download `siteData.json` Button:** One-click download of the complete updated site configuration.
  - **Optional PHP API Toggle:** Built-in fetch call to `/api/save.php` if hosted on a PHP-enabled Hostinger Apache/Nginx server to write directly to `siteData.json` on the server.

---

### 4. UI/UX & STYLING SPECIFICATIONS
- **Color Palette:** Executive Navy (`#0F172A`, `#1E3A8A`), Warm Amber Gold (`#D97706`, `#F59E0B`), Crisp Slate/White background.
- **Typography:** Inter or Plus Jakarta Sans.
- **Components:** Built with Tailwind CSS, Lucide-React icons, and shadcn/ui components.
- **Mobile First:** 100% fluid and responsive on smartphones and tablets.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://beyond-bloom-kit.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ffa09788-c51e-416e-9994-bf8933bd3000).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
