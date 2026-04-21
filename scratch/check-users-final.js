const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const users = await prisma.user.findMany({
    select: { email: true, name: true, role: true }
  });
  console.log('--- USERS IN DATABASE ---');
  console.log(users);
  console.log('-------------------------');
  
  await prisma.$disconnect();
  await pool.end();
}

main().catch(console.error);
