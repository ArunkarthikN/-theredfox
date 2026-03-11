# 🦊 The Red Fox | Automated News Aggregator

**The Red Fox** is a high-performance, automated news platform designed to deliver real-time insights across Technology, AI, Business, and Finance. Built with a modern full-stack architecture, it filters global news noise into a clean, readable feed.

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Automation:** n8n (Workflow Automation)
- **Server:** Ubuntu, Nginx, PM2

## 📁 Repository Structure

- `/theredfox-frontend`: Next.js web application.
- `/theredfox-api`: Express.js backend and API service.
- `/server_configs`: Nginx reverse proxy configuration.
- `database_schema.sql`: Complete PostgreSQL table structures.

## 🛠 Setup & Installation

### 1. Database
Import the schema into your PostgreSQL instance:
```bash
psql -U your_user -d theredfox < database_schema.sql
