# Todo Horizon

App de tarefas desenvolvido como teste técnico para a vaga de Desenvolvedor Mobile Júnior I na **Horizon Inovação e Tecnologia**.

---

## Como rodar

Precisa ter o Node 18+ instalado e o app **Expo Go** no celular (ou um emulador Android).

```bash
git clone <url-do-repositorio>
cd Todo-Horizon
npm install
npx expo start
```

Depois é só escanear o QR Code com o Expo Go ou pressionar `a` para abrir no emulador.

Para rodar os testes:

```bash
npm test
```

---

## Funcionalidades

- Listar tarefas carregadas da API
- Criar, editar e excluir tarefas
- Tela de detalhe de cada tarefa
- Busca por texto e filtro por status (todas / pendentes / concluídas)
- Validação no formulário com feedback em tempo real
- Persistência local com AsyncStorage (funciona offline)
- Estados de loading, erro com retry e lista vazia

---

## Stack

- React Native + Expo SDK 57
- TypeScript
- Expo Router (navegação por arquivos)
- AsyncStorage
- Jest + jest-expo
- API: [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)

---

## Estrutura do projeto

```
src/
├── api/          → chamadas para a API
├── components/   → componentes reutilizáveis
├── context/      → estado global com React Context
├── types/        → tipos TypeScript
└── utils/        → validações e testes

app/
├── _layout.tsx   → layout raiz
├── index.tsx     → tela principal
└── task/
    ├── create.tsx → criar tarefa
    └── [id].tsx   → detalhe e edição
```

---

## Decisões técnicas

**Expo:** escolhi o Expo porque facilita bastante o setup e qualquer pessoa consegue rodar o projeto com um `npx expo start`, sem precisar configurar ambiente Android/iOS do zero.

**Expo Router:** já vem integrado ao Expo e a navegação baseada em arquivos é bem mais simples de organizar do que configurar o React Navigation na mão.

**AsyncStorage:** usei para guardar as tarefas localmente. A estratégia é: ao abrir o app, busca da API e salva no cache. Se não tiver conexão, usa o que está salvo.

**IDs locais:** o JSONPlaceholder sempre retorna `id: 201` nos POSTs, então uso `Date.now()` para gerar IDs únicos nas tarefas criadas localmente, evitando conflitos.

**Validação:** a função de validação do título ficou em `src/utils/validation.ts` separado, assim consigo testar ela isolada sem renderizar componente.
