# CodeVector Take-Home Backend

This project is a small backend-focused take-home task for browsing a large dataset with filtering and pagination. The backend is the main part of the submission. I built the backend myself while using ChatGPT for small clarifications and support. The frontend is an optional browsing UI generated with Codex.

## Tech Stack

- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Frontend: React + Vite

## Backend Features

- Stores 200,000 generated records in MongoDB.
- Each record includes name, category, price, timestamps, and related fields.
- Supports browsing records newest first.
- Supports filtering by category.
- Supports paginated API responses.
- Includes a seed script that inserts records in batches using `insertMany`.

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run server
```

The API will run on:

```text
http://localhost:8000
```

## API

### Health Check

```http
GET /
```

### Get Records

```http
GET /api/members?page=1&limit=20
```

### Filter By Category

```http
GET /api/members?page=1&limit=20&category=Premium
```

Response includes:

- `members`
- `totalMembers`
- `totalPages`
- `currentPage`

## Frontend

The frontend is included only as a simple UI to browse the backend data.

```bash
cd frontend
npm install
npm run dev
```

If the backend URL is different, create a `.env` file in the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Notes On Implementation

I used MongoDB because it is simple to set up, works well with Node.js, and makes it easy to generate and store a large number of documents quickly.

The seed script inserts data in batches instead of inserting one document at a time, because one-by-one inserts would be much slower for 200,000 records.

For pagination, I currently use page-based pagination with `skip` and `limit`. I understand this is not the best approach for very large datasets or frequently changing data. A better production approach would be cursor-based pagination using a stable sort key such as `createdAt` and `_id`.

## AI Usage

I wrote the backend myself and used ChatGPT mainly to clarify ideas, review choices, and help me think through improvements. The frontend was generated using Codex as an optional UI layer, since the task is mainly about the backend.
