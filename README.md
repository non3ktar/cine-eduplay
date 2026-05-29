# CineEdu Pro

Um aplicativo PWA/Desktop offline-first de curadoria de filmes focado na educação e desenvolvimento ético, desenvolvido com a stack Vibe Coding (Premium UI Pro Max).

## Objetivo do Projeto
Criar um catálogo de filmes offline (usando IndexedDB via Dexie.js) contendo filmes com temática educacional e ética (como A Caça, Whiplash, Divertidamente, O Gigante de Ferro, e a minissérie O Fim da Infância). O aplicativo extrai metadados através da API Cinemeta do Stremio para enriquecer o catálogo com capas, sinopses e elenco, e inclui um player integrado usando links diretos do `streamimdb.ru`.

## Tech Stack
- **Frontend Framework**: Vite + React
- **Estilização**: TailwindCSS v4 (Glassmorphism, Dark Mode, UI Pro Max)
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Banco de Dados Local**: Dexie.js (Offline-first IndexedDB)
- **Roteamento**: React Router v6

## Como Configurar e Rodar Localmente

1. Certifique-se de ter o Node.js (v18+) instalado.
2. Clone ou descompacte o projeto.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse no navegador em `http://localhost:5173`.

## URL de Deploy / Hospedagem Recomendada
O projeto pode ser hospedado gratuitamente na **Cloudflare Pages**, **Vercel** ou **Netlify**. Como os metadados já estão cacheados no IndexedDB, o app funciona incrivelmente rápido após o primeiro acesso.
Para gerar a build de produção:
```bash
npm run build
```

## Histórico de Modificações (Changelog)
- **v1.0.0**: 
  - Inicialização do projeto com Vite e React.
  - Setup do TailwindCSS v4 com temas customizados (Dark Mode).
  - Criação do banco de dados local com Dexie.js.
  - Script Python integrado para automação de metadata via Stremio Cinemeta API.
  - Interface Home estilizada com Glassmorphism.
  - Tela de Player com iFrame integrado para o `streamimdb.ru` e detalhes dinâmicos.
