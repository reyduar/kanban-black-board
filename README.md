# Kanban Black Board

This is a project created by Next.js 13 and PrimeReact.

### Author

© 2023 Reynaldo Ariel Duarte

## Getting Started

### Run local database with Docker:

```bash
docker-compose up -d
```

> -d means: **detached**

### Database url

```bash
mongodb://localhost:27017/kanbandb
```

### Run endpoint to populate test data

```bash
GET http://localhost:3000/api/seed
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
