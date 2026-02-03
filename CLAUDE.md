# harBhar - Wedding Website

Wedding invitation website for **Harshitha Narasimhareddy** and **Sai Bharadwaj Reddy Arrabelly**.

**Wedding Date:** March 6, 2026
**Venue:** Pavilion at Carriage Farm, Raleigh, NC
**Hashtag:** #HarshithaWedsSaiBharadwaj

## Tech Stack

- **HTML5** - Structure and content
- **CSS3** - Styling with CSS variables, responsive design
- **Vanilla JavaScript** - Interactivity (no frameworks)
- **Formspree** - RSVP form backend
- **Google Fonts** - Cormorant Garamond, Montserrat
- **Google Maps Embed** - Venue location

## Project Structure

```
harBhar/
├── index.html    # Main HTML structure
├── script.js     # JavaScript functionality
├── styles.css    # All styling
└── CLAUDE.md     # This file
```

## Features

- **Countdown Timer** - Live countdown to wedding date
- **Our Story** - Couple introduction and engagement story
- **Events Timeline** - Haldi (March 5) and Wedding (March 6) ceremonies
- **Venue Map** - Embedded Google Maps with directions
- **Photo Gallery** - Masonry grid layout (placeholder for photos)
- **RSVP Form** - Guest registration with:
  - Primary guest details
  - Event selection (Haldi/Wedding)
  - Up to 3 additional guests
  - Dietary restrictions
  - Personal message
- **Admin Utilities** - Console functions: `viewRSVPs()`, `exportRSVPsToCSV()`, `clearRSVPs()`

## Color Scheme

| Color   | Hex       | Usage           |
|---------|-----------|-----------------|
| Gold    | `#D4AF37` | Primary accents |
| Maroon  | `#800020` | Secondary accent|
| Cream   | `#FFF8F0` | Background      |
| Yellow  | `#FFD700` | Highlights      |

## Hosting

**GitHub Pages** (Selected)

Free static site hosting directly from the repository.

### Setup Steps:
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch (main) and root folder
4. Enable GitHub Pages
5. Site will be live at `https://<username>.github.io/harBhar/`

### Custom Domain with GitHub Pages:
1. Add custom domain in repository Settings → Pages
2. Create `CNAME` file in repo root with domain name
3. Configure DNS at domain registrar (see Domain section)

## Domain

**Domain:** `harshwedsbharad.com`

### Where to Buy:
- **Namecheap** - Often cheapest, good UI
- **Google Domains** (now Squarespace) - Simple setup
- **GoDaddy** - Popular but watch for renewal pricing
- **Cloudflare Registrar** - At-cost pricing, no markup

### DNS Configuration for GitHub Pages:
Add these DNS records at your registrar:

**A Records** (for apex domain):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (for www subdomain):
```
www → <username>.github.io
```

### SSL/HTTPS:
GitHub Pages provides free SSL. Enable "Enforce HTTPS" in repository settings after DNS propagates.

## Development

To run locally, simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server installed)
npx http-server
```

## RSVP Data

RSVPs are submitted to Formspree and stored in localStorage for admin utilities. Access Formspree dashboard for all submissions.
