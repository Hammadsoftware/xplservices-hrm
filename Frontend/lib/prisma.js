import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global

// Hardcode Neon connection (only if you want to skip .env)
const adapter = new PrismaPg({
  connectionString: "postgresql://neondb_owner:npg_iFrNfuEMj4O3@ep-withered-heart-aipn3emx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
})

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
