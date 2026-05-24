import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// On instancie le client Prisma global
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // On ne laisse que les logs, Prisma gère la connexion tout seul via process.env.DATABASE_URL
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;