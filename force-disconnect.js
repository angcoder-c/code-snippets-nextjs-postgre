// force-disconnect.js
// Ejecuta esto para limpiar todas las conexiones

const { PrismaClient } = require('@prisma/client');

async function forceDisconnect() {
  console.log('Forzando desconexión de todas las instancias...');
  
  // Crea múltiples instancias para limpiar
  const clients = [];
  for (let i = 0; i < 5; i++) {
    clients.push(new PrismaClient());
  }
  
  // Desconecta todas
  for (const client of clients) {
    try {
      await client.$disconnect();
      console.log(`Cliente ${clients.indexOf(client) + 1} desconectado`);
    } catch (error) {
      console.log(`Error desconectando cliente ${clients.indexOf(client) + 1}:`, error.message);
    }
  }
  
  console.log('✅ Limpieza completada');
  process.exit(0);
}

forceDisconnect();