const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function main() {
  const users = await prisma.user.findMany({
    select: { email: true, name: true, role: true }
  });
  console.log('--- USERS IN DATABASE ---');
  console.log(users);
  console.log('-------------------------');
}

main().catch(console.error).finally(() => prisma.$disconnect());
