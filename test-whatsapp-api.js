const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testWhatsAppAPI() {
  try {
    // 1. Buscar um produto
    const product = await prisma.product.findFirst({
      include: { profile: true }
    });

    if (!product) {
      console.log('❌ Nenhum produto encontrado no banco');
      return;
    }

    console.log('✅ Produto encontrado:');
    console.log('  - ID:', product.id);
    console.log('  - Nome:', product.product_name);
    console.log('  - Telefone:', product.profile.phone_number);
    console.log('');

    // 2. Simular o que a API faz
    const phoneNumber = product.profile.phone_number;
    const productName = product.product_name;
    const message = `Olá! Estou interessado(a) no produto: ${productName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    console.log('✅ URL do WhatsApp que será gerada:');
    console.log(whatsappUrl);
    console.log('');

    console.log('📋 Como testar:');
    console.log('1. Inicie o servidor: npm run dev');
    console.log('2. Acesse: http://localhost:3000/api/whatsapp?product=' + product.id);
    console.log('3. Deve redirecionar para o WhatsApp com a mensagem acima');
    console.log('');
    console.log('🔍 Para verificar proteção:');
    console.log('1. Acesse: http://localhost:3000/nossa-producao');
    console.log('2. Abra DevTools (F12) > Network');
    console.log('3. Clique no botão WhatsApp de um produto');
    console.log('4. Veja que o request vai para /api/whatsapp?product=...');
    console.log('5. ✅ O telefone NÃO aparece no HTML/JavaScript!');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testWhatsAppAPI();
