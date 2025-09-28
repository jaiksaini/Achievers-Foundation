import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// async function main() {
//   // Create a new user
//   const newUser = await prisma.user.create({
//     data: {
//       name: "Vinay Saini",
//       email: "vinaysaini4@example.com",
//       password:"111111"
//     },
//   });

//   console.log(newUser);

// }

// main()
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
