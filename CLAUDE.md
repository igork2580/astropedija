# AstroPut — Project Instructions

## Infrastructure
- **Backend API:** FastAPI + Uvicorn on Hetzner VPS (`88.198.88.85:8000`), systemd service `astroput-api.service`
- **Backend dir:** `/opt/astroput/api`
- **Database:** PostgreSQL `astroput` on Hetzner (local access only)
- **Deploy backend:** `scp -i "C:/projects/websites/astroput.com/hetzner" -r api/* root@88.198.88.85:/opt/astroput/api/` then `ssh ... "systemctl restart astroput-api"`
- **Crons (VPS crontab):** Daily/weekly/monthly horoscope generation at 05:00 UTC via `curl POST http://127.0.0.1:8000/api/v1/horoscopes/generate/{period}`
- **Infrastructure source of truth:** `C:\projects\websites\mvp_websitemanager\lib\sites.ts` — canonical config for all sites, backends, ports, databases, and crons. Update that file when changing infrastructure.

## Content Writing Rules

**When writing any content** (page copy, descriptions, blog posts, meta tags, MDX files, any user-facing text):

1. **Read the content rules file first**: `G:\My Drive\content-rules-sr.md`
2. Follow every rule in that file — tone, banned phrases, SEO structure, E-E-A-T, quality standards
3. Do NOT use any internal/local content rules — the Google Drive file is the single source of truth

This applies to all content in Serbian for this project. The rules file covers:
- Voice and tone guidelines
- Banned AI-marker phrases
- SEO keyword and structure requirements
- E-E-A-T compliance (Experience, Expertise, Authoritativeness, Trustworthiness)
- Google Helpful Content signals
- Pre-publish quality checklist
