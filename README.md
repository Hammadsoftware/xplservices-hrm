# HR Backend Server

Express server with Prisma ORM and PostgreSQL (Neon) database connection.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
DATABASE_URL="your-mysql-connection-string-here"
MySQL url

- Create a `.env` file in the project root:
```bash
cp .env.example .env
```
- Add your Neon connection string to `.env`:
```
DATABASE_URL="postgresql://user:password@ep-xxxxx.us-east-1.neon.tech/dbname?sslmode=require"
PORT=3000
NODE_ENV=development
```

### 3. Setup Database Schema
```bash
npm run prisma:migrate
```

### 4. Start the Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Create/apply database migrations
- `npm run prisma:studio` - Open Prisma Studio (visual database browser)
- `npm run prisma:push` - Push schema changes to database

## API Endpoints

### Health Check
- `GET /health` - Server status

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department

## Project Structure

```
hr-backend/
├── src/
│   └── index.js           # Main Express server
├── prisma/
│   └── schema.prisma      # Database schema
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Technologies Used

- **Express.js** - Web framework
- **Prisma** - ORM for database operations
- **PostgreSQL** - Database (via Neon)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables management
# HRM
# HRM
# xplservices-hrm
