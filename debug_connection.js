// debug-connection.js
// Crea este archivo en la raíz de tu proyecto y ejecútalo con: node debug-connection.js

const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Probando conexión a la base de datos...');
    await prisma.$connect();
    console.log('✅ Conexión exitosa!');
    
    // Prueba una query simple
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Query de prueba exitosa:', result);
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('Detalles completos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();