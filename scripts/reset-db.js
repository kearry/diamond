// scripts/reset-db.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function resetDatabase() {
  try {
    console.log('Resetting database...');
    
    // Delete the database file if it exists
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    if (fs.existsSync(dbPath)) {
      console.log('Removing existing database file...');
      fs.unlinkSync(dbPath);
    }
    
    // Create a new Prisma client
    const prisma = new PrismaClient();
    
    // Connect to the database (this will create a new file)
    console.log('Connecting to database...');
    await prisma.$connect();
    
    // Push the schema
    console.log('Database reset complete!');
    console.log('Now run: npx prisma db push');
    
    // Disconnect
    await prisma.$disconnect();
    
    console.log('Done! The database has been reset.');
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();