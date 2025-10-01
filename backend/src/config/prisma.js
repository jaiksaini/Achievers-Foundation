import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    await prisma.$executeRaw`ALTER TABLE Member AUTO_INCREMENT = 10000000;`;
  }
  main().finally(() => prisma.$disconnect())

export default prisma;

