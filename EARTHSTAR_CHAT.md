# Chat do Quintal à Cozinha - Nosso Espaço

## 📝 Sobre

Implementamos um sistema de chat na página "Nosso Espaço". 

**Nota sobre Earthstar**: Inicialmente tentamos usar o Earthstar (ferramenta para armazenamento distribuído offline-first), mas encontramos problemas de compatibilidade:
- O pacote npm não compila no Node.js 22 (dependência better-sqlite3)
- A versão CDN não expõe corretamente a API global
- A documentação está desatualizada para a versão v10

Por isso, implementamos **uma versão simplificada usando localStorage** que funciona perfeitamente para começar. Veja a seção "Migração para Earthstar" no final se quiser adicionar sincronização distribuída futuramente.

## 🚀 Como funciona

### Arquitetura Atual

1. **Armazenamento Local**: As mensagens são armazenadas no navegador usando:
   - **LocalStorage**: Para guardar mensagens e nome de usuário
   - Persistência automática no navegador

2. **Componentes**:
   - `src/components/earthstar-chat.tsx`: Componente do chat com botão flutuante
   - `src/components/cooking.tsx`: Página "Nosso Espaço" que integra o chat

## 💾 Estrutura de Dados

As mensagens são objetos JavaScript simples:

```typescript
interface Message {
  id: string;        // ID único: timestamp + random
  author: string;    // Nome do usuário
  text: string;      // Conteúdo da mensagem
  timestamp: number; // Timestamp em milissegundos
}
```

Todas as mensagens ficam armazenadas como JSON no `localStorage` com a chave `chat_messages`.

## 💻 Como usar

1. Acesse a página "Nosso Espaço": `/nosso-espaco`
2. Clique no botão flutuante de chat (canto inferior direito)
3. Digite seu nome
4. Comece a conversar!

## 🔄 Sincronização

**Importante**: Atualmente o chat funciona apenas **localmente** no navegador. Cada usuário vê apenas suas próprias mensagens.

Para compartilhar mensagens entre usuários, você precisa adicionar um backend. Veja as opções abaixo:

### Opção 1: API REST Simples
Crie endpoints no Next.js:

```typescript
// app/api/chat/route.ts
export async function GET() {
  // Buscar mensagens do banco de dados
  const messages = await prisma.message.findMany();
  return Response.json(messages);
}

export async function POST(request: Request) {
  // Salvar nova mensagem
  const data = await request.json();
  const message = await prisma.message.create({ data });
  return Response.json(message);
}
```

### Opção 2: WebSocket / Socket.io
Para chat em tempo real:

```bash
npm install socket.io socket.io-client
```

### Opção 3: Firebase / Supabase
Serviços prontos com sincronização em tempo real.

## 🔐 Segurança

- Mensagens ficam armazenadas localmente no navegador
- Dados persistem até o usuário limpar o cache
- Não há autenticação no momento (qualquer pessoa pode usar qualquer nome)

## 🛠️ Próximos passos

Para melhorar o chat, você pode:

1. **Adicionar backend e sincronização**
   - Criar API REST para salvar/buscar mensagens
   - Ou usar WebSocket para tempo real
   - Ou serviços como Firebase/Supabase

2. **Adicionar autenticação**
   - NextAuth.js para login
   - Vincular mensagens a usuários reais
   - Permissões e moderação

3. **Melhorar funcionalidades**
   - Notificações de novas mensagens
   - Lista de usuários online
   - Upload de imagens
   - Emojis e reações
   - Busca de mensagens
   - Botão para limpar histórico

4. **Melhorar a experiência**
   - Avatares dos usuários
   - Indicador de "digitando..."
   - Sons de notificação
   - Temas personalizados

## 🔄 Migração para Earthstar (Avançado)

Se você quiser usar Earthstar para sincronização P2P distribuída:

### Desafios encontrados:
1. **Incompatibilidade com Node.js 22**: O pacote npm não compila
2. **CDN não funciona**: A versão v10 via CDN não expõe window.Earthstar corretamente
3. **Documentação**: V10 vs V11 (beta) têm APIs diferentes

### Soluções possíveis:
1. **Usar Deno**: O Earthstar funciona melhor com Deno
2. **Downgrade Node.js**: Usar Node.js 18 ou 20
3. **Build manual**: Compilar better-sqlite3 manualmente
4. **Aguardar v11**: Versão beta usa Willow protocol

### Recursos Earthstar:
- [Documentação](https://earthstar-project.org/)
- [GitHub](https://github.com/earthstar-project/earthstar)
- [Willow (v11)](https://willowprotocol.org)

## ⚠️ Notas técnicas

- Chat usa localStorage para persistência local
- Dados são específicos de cada navegador
- Limpar cache do navegador apaga as mensagens
- Para produção, considere adicionar backend
