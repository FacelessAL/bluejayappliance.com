# ⚠️ LEGACY REFERENCE - Original Norman Mechanical WordPress Site

> **Note:** This document is a historical reference from the old Norman Mechanical WordPress template. The current Blue Jay Appliance site uses a completely different color scheme and layout. See `TEMPLATES.md` for current design tokens.

# WP Site Reference - Extracted from post-87.css + post-219.css + Screenshots

## COLOR MAP (from screenshots + CSS context)
- Dark Navy BG: #13152C
- Dark Navy Overlay: #13152CCF (81% opacity)
- Red CTA: #c41e2f (REQUEST A QUOTE button, service card borders)
- Light Blue: #4fc3f7 (icon boxes, some buttons)
- Blue Accent: #454A77 (location pills, service area)
- White: #FFFFFF (text on dark, card backgrounds)
- Body Text on White: dark gray/black

## HEADER (post-219.css)
### TopBar
- Fixed top, z-index 55, bg #13152C
- Bottom border: 3px solid red
- Content row: flex, gap 100px, padding 20px 0
- Logo: left side
- Review section: "REVIEW US" Figtree 16px 700 uppercase white + star badge (100px) + Google/FB badges (70px each)
- Emergency section: phone icon (30px white bg rounded), "24-HR EMERGENCY" Figtree 14px 600 uppercase white, "SERVICE AVAILABLE" Poppins 17px 600
- Call section: phone icon, "CALL US NOW" Figtree 14px 600, "773-4-NORMAN / 773-466-7626" Poppins 17px 600

### Navbar
- bg dark (same or slightly different from topbar)
- padding 15px 0
- Nav links: Poppins, white, centered
- REQUEST A QUOTE: red bg, white text, right-aligned

## HOMEPAGE SECTIONS (post-87.css)

### 1. HERO (c317b69)
- min-height: 90vh
- margin-top: 180px (clears fixed header)
- bg: hero-bg.webp, center center, cover
- padding-bottom: 100px
- content-width: 1200px
- justify/align: center/center
- **Overlay box (7c977b6):** width 700px, bg #13152CCF, padding 50px 30px
  - "Norman Mechanical": Figtree 30px 700 white center
  - Tagline: Figtree 54px 700 white center
  - Buttons: flex row, center, gap 50px
    - REQUEST A SERVICE: bg light-blue, Figtree 18px 700, radius 6px, padding 12px 15px
    - VIEW OUR SERVICES: bg white, text dark navy, Figtree 18px 700, radius 6px, padding 12px 15px
- **Van image:** positioned left 42%, bottom -5%, width 750px (overlaps into next section)

### 2. TOP-RATED PLUMBERS (f99c7cb)
- padding: 80px 0
- content-width: 1200px
- bg: white (no dark bg!)
- align: center
- **Heading:** Figtree 45px 700 uppercase, color dark navy
- **Paragraph:** Poppins 18px 500 line-height 31px, dark text
- **Icon Grid (c3e56cd):** grid 4 columns
  - Each box: padding 30px, bg light-blue, hover bg dark-navy, box-shadow
  - Icon image: 80px wide (actual PNG/SVG icons from WP)
  - Label: Figtree 30px 700 uppercase white

### 3. NOBODY WOWS CLIENTS (883708a)
- flex row, space-between, center, gap 30px
- padding: 80px 0, content-width: 1200px
- bg: Plumber.webp + overlay #13152CCF
- shape-bottom: dark navy fill, 50px height
- **Left (50%):** 
  - Heading: Figtree 45px 700 uppercase line-height 50px white
  - Paragraph: Poppins 18px 400 line-height 31px white
  - Button: bg light-blue, Figtree 18px 700, radius 6px, padding 12px 15px
- **Right (50%):**
  - Image: width 100%, height 612px (the van/job photo)

### 4. SERVICE CARDS (7b9053e)
- padding: 80px 0
- bg: dark navy (#13152C)
- content-width: 1200px
- **Heading:** Figtree 39px 700 uppercase line-height 44px white center
- **Paragraph:** Poppins 18px 400 line-height 31px, lighter text
- **Grid:** 3 columns x 2 rows
- **Each Card:**
  - bg white, border-bottom 10px solid red
  - Image: height 300px, full width
  - Content: padding 20px
  - Title: Figtree 30px 700 uppercase, dark navy
  - Button: bg red, Figtree 16px 700, radius 2px, padding 8px 20px, hover dark navy

### 5. SEASONED EXPERTISE / 24HR (a1ae73d)
- flex row, space-between, center, gap 50px
- padding: 80px 0, content-width: 1200px
- bg: white
- shape-top: dark navy fill, 50px
- **Left (60%):**
  - Heading: Figtree 45px 700 uppercase line-height 50px, dark navy
  - Paragraph: Poppins 18px 400 line-height 31px, dark text
  - Google/FB review images: 300px wide
- **Right (40%):**
  - Image: width 100%, height 612px, box-shadow

### 6. PERSONAL TOUCH (ff683e5)
- padding: 80px 0
- bg: personal-touch-bg.webp, cover, center, FIXED attachment
- **Overlay box (601ab50):** bg #13152CCF, padding 80px 30px
  - Heading: Figtree 45px 700 uppercase white center
  - Paragraph: Poppins 18px 400 line-height 31px white center

### 7. 24/7 EMERGENCY (9995f93)
- flex row, space-between, center, gap 50px
- padding: 80px 0, bg white
- **Left (40%):**
  - Image: width 380px
- **Right (60%):**
  - Heading: Figtree 45px 700 uppercase line-height 50px, dark navy
  - Paragraph: Poppins 18px 400 line-height 31px, dark text
  - Button: bg dark navy, Figtree 18px 700, radius 6px, padding 12px 30px
  - Phone text: Poppins 20px 600, dark navy

### 8. SERVICE AREA
- Left half: bg norman-map.gif, cover
  - Overlay (bd53e96): width 600px, bg service-area-overlay.webp + overlay #13152CCF
    - padding: 50px 40px
    - Heading: Figtree 45px 700 line-height 50px white
    - Paragraph: Poppins 18px 400 line-height 24px white
    - Location pills: bg #454A77, padding 20px, border-left 5px red, radius 8px
      - Text: Figtree 18px 400 uppercase line-height 1.5em white

### 9. TESTIMONIALS (2e43767)
- padding: 80px 0, content-width: 1200px
- Heading: Figtree 45px 700 uppercase line-height 50px, dark navy
- Review badges: 200px each, flex row center, margin-top 50px

### 10. CTA / CONTACT FORM (c137103)
- flex row, space-between, gap 50px
- padding: 80px 0, bg white
- **Left (50%):**
  - Heading: Figtree 35px 700 uppercase line-height 39px, dark navy
  - Paragraph: Poppins 18px 400 line-height 31px, dark text
- **Right (50%):**
  - Border: 1px solid #B7B7B7, bg white, padding 50px 20px 20px
  - Form heading: Figtree 30px 700 uppercase line-height 39px

### 11. PRE-FOOTER BAND (f92091a)
- min-height: 350px, flex row, space-between, center
- padding: 20px 0, bg dark navy, content-width: 1200px
- **Hand wrench:** left -10%, width 300px, rotated -60deg
- **Text container:** padding-left 150px
  - Heading: Figtree 45px 700 uppercase white
  - Paragraph: Poppins 20px 600 line-height 30px white
  - Button: bg red(?), Figtree 18px 700, radius 6px, padding 12px 15px
