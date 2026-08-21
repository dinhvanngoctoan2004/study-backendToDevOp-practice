\# Project: Backend → DevSecOps Practice

> Dự án thực hành cho lộ trình học Backend → DevSecOps.

> Roadmap và tài liệu học tập ở repo: `study-backend-devops`.

\## Bối cảnh

Đang thực hành trên \*\*F3-DevTalk\*\* — nền tảng TOEIC/e-learning.

\## Tech stack (theo roadmap)

\- \*\*Language:\*\* TypeScript (strict mode)

\- \*\*Runtime:\*\* Node.js

\- \*\*Framework:\*\* Express

\- \*\*DB:\*\* MongoDB (chính) + PostgreSQL (bổ sung sau)

\- \*\*ORM:\*\* Prisma (PostgreSQL track)

\- \*\*Validation:\*\* Zod

\- \*\*Logger:\*\* Pino + Morgan

\- \*\*Test:\*\* Jest + Supertest

\- \*\*Container:\*\* Docker + Docker Compose

\- \*\*CI/CD:\*\* GitHub Actions

\- \*\*Cloud:\*\* AWS EC2 (initial)

\## Cấu trúc thư mục
src/

├── routes/ # HTTP routes

├── controllers/ # Handle request/response

├── services/ # Business logic

├── repositories/ # Data access layer

├── middlewares/ # Express middlewares

├── types/ # TypeScript types

└── config/ # App config (db, env)

\## Review workflow

Mọi bài tập được review bởi AI Code Reviewer (Chat kết nối với repo này).

Review được lưu tại `review-history/` dưới dạng JSON.

Xem `AGENTS.md` để biết format JSON và quy tắc.

\## Scripts

```bash

pnpm dev          # Chạy dev với tsx

pnpm build        # Build TypeScript

pnpm start        # Chạy production

pnpm test         # Chạy Jest

pnpm lint         # ESLint check
Environment files

.env.development — dev local

.env.test — CI/CD test

.env.production — production (không commit giá trị thật)


```
