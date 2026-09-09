This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

$ npx create-next-app@latest .
Need to install the following packages:
create-next-app@16.3.4
Ok to proceed? (y) y

√ Would you like to use the recommended Next.js defaults? » No, customize settings
√ Would you like to use TypeScript? ... No / Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use React Compiler? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like your code inside a `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... No / Yes
Creating a new Next.js app in C:\Users\user\Documents\Project\freelance\denver-build.

npm install -D prisma@7
npm install @prisma/client@7
npx prisma init

buat db di dbvear atau pg admin
isikan .env dengan DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/denver_build?schema=public"
lanjut isi prisma/schema.prisma
setelah itu jalankan perintah untuk validasi -> npx prisma validate
npx prisma migrate dev --name init -> migrasi tabel ke database
npx prisma generate -> lanjut generate client prisma
Lalu cek di DBeaver. Refresh database denver_build dan harus muncul tabel

- buat Prisma client helper di src/lib/prisma.ts
install adapter: npm install @prisma/adapter-pg pg
- Seed admin
intsall bcrypt: npm install bcryptjs
tambahkan script di package.json "seed": "tsx prisma/seed.ts"
lalu install tsx: npm install -D tsx
buat file seed di prisma/seed.ts
jalnkan seed : npm run seed
cek di dbeaver apakah sudah ada data admin

- Auth.js
install next-auth: npm install next-auth
buat file src/auth.ts
buat file src/types/next-auth.d.ts
buat file route handler auth -> src/app/api/auth/[...nextauth]/route.ts
tambahkan env AUTH_SECRET="2c27b700acccc381d938209e29c6ea81f58d3f4c5c77470e864c2f20efe8d9af" di .env -> generate: npx auth secret
build dlu memastikan aman: npm run build

- ngoding Protected /admin

npm install lucide-react
npm install zod
npm install sonner
npm install cloudinary
    sisa salin env projetc sebelumnya: 
        CLOUDINARY_CLOUD_NAME="..."
        CLOUDINARY_API_KEY="..."
        CLOUDINARY_API_SECRET="..."