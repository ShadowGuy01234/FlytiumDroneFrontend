# Flytium Frontend Redesign Plan

## 1. Vision & Experience Narrative
- **Brand personality**: Precise, courageous, trustworthy. Flytium should feel like the craftsperson of intelligent aerial systems—less generic SaaS, more modern aerospace atelier.
- **Audience lenses**: Enterprise buyers (agriculture, surveillance, logistics), tech enthusiasts, and prospective employees. Each touch point should balance credibility with human storytelling.
- **Guiding feelings**: Confident first impression, smooth browse-to-buy journey, and a sense of handcrafted innovation through depth, motion, and material choices.

## 2. Design System Foundations
### 2.1 Palette
| Token | Hex | Usage |
| --- | --- | --- |
| `--color-primary` | `#0B1226` | Backgrounds, typography on light surfaces, hero overlay |
| `--color-accent` | `#2BC5F9` | Primary CTA, highlights, data viz |
| `--color-secondary` | `#FFB453` | Supporting CTA, hover accents, micro-interactions |
| `--color-surface` | `#F4F6FB` | Light panels, cards, secondary backgrounds |
| `--color-surface-dark` | `#101B39` | Dark-mode surfaces, video / spec sections |
| `--color-success` | `#3CD77D` | KPIs, status badges |
| `--color-danger` | `#FF4D6D` | Errors, destructive actions |
| `--color-neutral-900` → `--color-neutral-100` | `#0F172A` → `#F8FAFC` | Typographic scale, grid separators |

Enhance depth with subtle iridescent gradients: `linear-gradient(135deg, rgba(43,197,249,0.95) 0%, rgba(180,100,255,0.85) 100%)` applied sparingly to hero and CTA backplates.

### 2.2 Typography
- **Display / Headlines**: `Space Grotesk` (600–700 weight). Geometric, professional, aerospace-inspired.
- **Body**: `Inter` (400–500). Crisp legibility across dense informational sections.
- **Mono / Data**: `JetBrains Mono` (optional) for specs, code snippets, telemetry readouts.
- Establish a responsive type scale using Tailwind `clamp()` utilities, e.g. `text-hero = clamp(2.5rem, 5vw + 1rem, 4.5rem)`.

### 2.3 Layout & Spacing Tokens
- **Grid**: 12-column, `max-width: 1224px`, safe gutter `24px`, mobile gutter `16px`.
- **Spacing scale**: `4px` base. Define tokens `space-1 = 4px`, `space-2 = 8px`, `space-3 = 12px`, `space-4 = 16px`, `space-6 = 24px`, `space-8 = 32px`, `space-12 = 48px`, `space-16 = 64px`.
- **Radius**: `4px` for inputs, `12px` for cards, `24px` for feature panels.
- **Elevation**: Layered shadows `shadow-100`, `shadow-200`, `shadow-glow` defined in Tailwind plugin to create crafted depth.

### 2.4 Imagery & Iconography
- Curate hero drone renders with cinematic lighting; overlay with blueprint-style line art or telemetry HUD elements.
- Replace stock icons with a minimal outline set (e.g. Phosphor or custom line icons) to avoid AI-generator look.
- Introduce lifestyle imagery (pilots, workshops, field deployments) to humanize.

### 2.5 Motion & Interactions
- Micro-interactions with Framer Motion: `duration: 0.45s`, `ease: [0.6, -0.05, 0.01, 0.99]`.
- Use parallax on hero background grid, scroll-triggered reveals for features, and magnetic buttons for primary CTA.
- Limit to two concurrent animations; respect `prefers-reduced-motion`.

### 2.6 Consistency Enablers
- Extend Tailwind config with custom colors, typography, spacing, and plugin for `fluid-type`.
- Centralize theme tokens in `styles/design-tokens.css` and refactor components to consume via utility classes or CSS variables on `:root`.

### 2.7 Data-Driven Content Map
| Dataset | Backend Source | Admin Surface | Frontend Consumption | Notes |
| --- | --- | --- | --- | --- |
| Hero Slides | `Hero` model → `GET /api/hero` | `ManageHero` (create/update/delete, Cloudinary uploads) | Homepage hero carousel (`Hero.jsx`) | Respect `order` for sequencing, honor `isActive`, provide graceful fallback if zero slides. |
| Promotional Ads | `Ad` model → `GET /api/ad/get-ads` | `CreateAd` (CRUD, Cloudinary uploads) | Homepage promo card (`Ad.jsx`), future marketing sections | Surface multiple ads (carousel or featured grid) and support feature list rendering + price formatting. |
| Categories | `Category` model → `GET /api/category/get-category` | `CreateCategory` (CRUD) | Homepage “Our Products”, Store filters, product forms | Keep slug-driven navigation (`/category/:slug`); ensure image aspect ratios & placeholders. |
| Products | `Product` model → `GET /api/product/*` | `CreateProduct`, `Products` admin list | Store grid, Product detail, Category listing, Cart, Checkout | Preserve slug routing, handle discounted pricing, show category relationship. |
| Employees | `Employee` model → `GET /api/employee/get-employees` | `ManageEmployees` (CRUD, toggle active, Cloudinary) | Careers page, potential About/team sections | Filter by `status` + `isActive`, display `tenure`, respect `displayOrder` and `featured` flags. |
| Orders & Payment | `Order` model, Razorpay verify | `AdminOrders`, user `Orders` | Checkout success, dashboards, order history | Maintain status transitions, display payment metadata securely. |
| Dashboard Stats | Aggregated in `GET /api/auth/dashboard-stats` | `AdminDashboard` | Admin charts, KPI widgets | Extend API to return real monthly/category data; fallback when array empty. |

### 2.8 Dynamic UX Guardrails
- **Skeletal states**: Introduce skeleton loaders (hero, product grids, employee cards) instead of “Loading…” text to keep polish.
- **Empty states**: Provide purpose-built empty UI for each dataset (no ads, no employees) with CTA linking to admin management.
- **Content governance**: Enforce copy length limits in UI (truncate with tooltip) and leverage `line-clamp` utilities to guard against admin-entered overflow.
- **Resilience**: Validate media URLs, show responsive placeholders if Cloudinary assets fail, and surface toast-level errors only when user action is required.
- **Preview consistency**: Mirror frontend typography, spacing, and validations inside admin forms to ensure WYSIWYG expectations for editors.

## 3. Landing Page Blueprint
1. **Smart Top Nav**
   - Transparent over hero, becomes solid with subtle backdrop blur after scroll.
   - Include quick links (`Solutions`, `Industries`, `Resources`, `Store`, `Contact`) and a persistent "Talk to an Expert" CTA.
   - Add "Request Demo" button on desktop and icon-only cart.

2. **Hero Section**
   - Two-column layout: left copy with dynamic telemetry HUD, right 3D drone render or looping product video.
   - Primary CTA "Explore Flytium Fleet" + secondary "Download Catalog"; surface hero slides from CMS with auto-height and slide progress indicator.
   - Add trust bar (logos, certification badges) below fold.

3. **Value Proposition Tiles**
   - Three cards (Flight Intelligence, Modular Payloads, Mission Control) with iconography, short lines, "Learn more" micro CTA.
   - Hover reveals gradient glows and subtle top border animation.

4. **Featured Fleet Carousel**
   - Horizontal scroll showing 3 flagship drones. Each card includes spec highlights, quick comparison button, and pipes from `/api/product/get-product` with category filters.
   - Provide sticky navigation to jump to categories (Agritech, Surveillance, Custom builds).

5. **Use-Case Stories**
   - Alternating split sections with field photography, KPI stats, and testimonial pull quotes.
   - Integrate timeline to show mission start-to-complete.

6. **Interactive Drone Configurator Teaser**
   - Steps: Choose Mission → Select Frame → Add Sensor → Receive Estimate.
   - CTA leading to detailed configurator (future iteration).

7. **Video & Media Spotlight**
   - Immersive dark section with video background, overlayed copy, stats trending counters.

8. **Telemetry Dashboard Preview**
   - Showcase Flytium mission control UI with animated metrics to build trust in software ecosystem.

9. **Testimonials + Certifications**
   - Rotating quotes, partner logos, regulatory certificates.

10. **Resource Library Snippet**
   - Card trio linking to whitepapers, webinars, blog; optionally source from dedicated CMS or extend `Ad` model for content promos.

11. **Final CTA**
    - Large gradient panel with contact CTA and quick contact form snippet.

12. **Footer**
    - Four-column layout: Products, Company, Support, Legal. Add newsletter subscription, social icons, address.

## 4. Secondary Page Strategies
### 4.1 Store (`/store`)
- **Filter rail** left: mission type, payload capacity, price range, availability. Use sticky sidebar on desktop, slide-out sheet on mobile.
- **Product cards** fed by `/api/product/get-product`: photo, badge (New/Popular), short spec chips, price, CTA, quick spec popover.
- Sync category filters with `/api/category/get-category`. Add compare drawer (select up to 3 items) and sticky "Contact Sales" CTA.

### 4.2 Product Details (`/product/:slug`)
- Hero gallery with thumbnails, 360° viewer placeholder (multiple images from future product schema).
- Two-fold narrative: specs table + mission highlights. Fetch via `/api/product/get-product/:slug` and guard against missing data.
- Tabs for "Specifications", "Payload Options", "Accessories", "Documentation".
- Persistent CTA bar (Buy, Request demo, Add to cart).
- Related products carousel using `/api/product/product-category/:slug`.

### 4.3 Services (`/services`)
- Sectioned approach: Fleet Services, Custom Integrations, Training, Support.
- Each block includes icon, summary, bullet benefits, case study link.
- CTA form for service inquiry; consider powering case studies via `Ad`-style CMS extension for future-proofing.

### 4.4 About (`/about`)
- Founding story timeline, leadership portraits, culture values.
- Stats band (years flying, hours logged, countries served).
- Careers teaser linking to `/career` with dynamic counts from employee API.

### 4.5 Contact (`/contact`)
- Split layout: contact form + office map/locations.
- Add direct lines (sales, support) with CTA buttons (call, email).

### 4.6 Career (`/career`)
- Hero with mission statement, benefits grid, department filters.
- Team showcase pulls from `/api/employee/get-employees` grouped by `status` + `featured`. Job listing cards with tags (location, schedule). Deep link to application form.

### 4.7 Cart & Checkout (`/cartpage`, `/checkout`)
- Clean order summary with product thumbnails, quantity steppers, shipping estimator.
- Checkout: progress indicator, left form (shipping/billing), right order summary.

### 4.8 Auth Flows (`/login`, `/signup`, `/login-success`, `/register-success`)
- Split-screen layout with brand imagery or gradient on left, form on right.
- Add trust copy ("Secure sign-in", "Powered by Flytium cloud"). Ensure validation + messaging align with backend responses (`authController`).

### 4.9 Policy Pages
- Structured typography, in-page nav (sticky) to jump between sections, highlight definitions.

### 4.10 User & Admin Dashboards
- **User**: Card-based overview (orders, profile, support). Provide improved table styling.
- **Admin**: Redesigned widgets (metrics, quick actions), consistent table design with sorting, responsive sidebar.
- Plug into `/api/auth/dashboard-stats`, `/api/auth/all-orders`, `/api/employee/get-employees` with live data visualizations. Include state indicators (published/draft) and status chips.

## 5. Component System Refactor
- **Atoms**: Buttons, Icon buttons, Tag, Badge, Input, Select, Toggle, Pill, Chip, Divider.
- **Molecules**: Stats card, Testimonial block, Product spec list, Filter pill group, CTA banner.
- **Organisms**: Hero, Feature row, Fleet carousel, Testimonial slider, Pricing table, Footer.
- **Templates**: Landing page, Store, Product detail, Dashboard layout.

Centralize component exports under `src/components/ui/`. Use Storybook or Ladle for component playground (optional stretch).

## 6. Interaction Patterns
- Hover states with color shifts, depth change (`translateY(-6px)`), subtle glow.
- Scroll-based reveal on sections using `IntersectionObserver` (Framer Motion `whileInView`).
- Add `focus-visible` outlines, accessible skip links, ARIA labels throughout.
- Provide skeleton loaders for data-fetching grids (categories, hero, products).

## 7. Accessibility & Performance Guardrails
- Color contrast minimum 4.5:1, test with Stark plugin / Tailwind `@tailwindcss/forms` for consistent inputs.
- Lazy-load heavy media, implement `picture` tags for responsive images, supply web-optimized MP4/webm.
- Use `prefers-reduced-motion` media queries to disable non-essential animations.
- Audit with Lighthouse (target 90+ across categories).

## 8. Implementation Roadmap
1. **Design System Setup (Week 1)**
   - Update `tailwind.config.js` tokens (colors, fonts, spacing).
   - Add `styles/design-tokens.css` and global CSS reset improvements.
   - Refactor buttons, typography utilities, container class.

2. **Layout & Navigation (Week 1-2)**
   - Rebuild Navbar & Footer with new tokens and responsive interactions.
   - Establish base page containers & layout wrappers.

3. **Landing Page (Week 2-3)**
   - Implement hero (with API-driven slides), value props, fleet carousel, use-case sections, media, testimonials, CTA.
   - Integrate new imagery and update existing API consumption.

4. **Secondary Pages (Week 3-4)**
   - Store, Product details, Services, About, Contact, Careers, Cart, Checkout, Auth.
   - Introduce filter logic, new components (tabs, accordions, timeline).

5. **Dashboard & Admin Refresh (Week 4-5)**
   - Rework admin tables, cards, metrics, forms for cohesion.

6. **Polish & QA (Week 5)**
   - Accessibility fixes, performance tweaks, motion balancing, cross-browser QA.
   - Prepare Storybook (optional) for long-term maintainability.

## 9. Asset & Content Backlog
- Commission or capture 4–5 hero-quality drone renders (PNG + transparent background).
- Collect mission photography & videos (landscape orientation for hero, portrait for use-case sections).
- Draft new copy (taglines, value props, testimonials) aligned with brand voice.
- Design icon set or adopt cohesive third-party pack.

## 10. Tooling & Collaboration Notes
- Consider using Figma for high-fidelity mocks; structure file with pages per site section.
- Maintain a content matrix to track copy updates and translation readiness.
- Version control: branch per feature (`feature/landing-hero`, `feature/store-grid`).

## 11. Immediate Next Steps
1. Create visual mood board + Figma wireframes aligned to this plan.
2. Extend Tailwind theme and define CSS variables to match tokens.
3. Build core UI kit components (`Button`, `SectionHeading`, `Card`, `Pill`, `MetricBadge`).
4. Model CMS data in design mocks (hero slides, ads, categories, products, employees) to validate responsive behavior.
5. Start with navigation & hero implementations while assets are finalized.

---
This plan transforms Flytium from generic AI-generated visuals into a polished, intentional aerospace experience. Each section above maps to actionable development work and provides a North Star for visual design, content, and interactions.
