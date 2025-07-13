# 🚀 TodoList App

Este é um aplicativo de lista de tarefas que criei, feito com React Native e Expo. Meu objetivo foi construir algo simples, elegante e que oferecesse uma experiência de uso bem fluida e moderna.

## Mobile Preview

![SimulatorScreenRecording-iPhone16Pro-2025-07-13at11 45 11-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/ec8ae6a5-3816-4ef2-b385-6b46c1c8abf3)


## ✨ Features

- Adicionar, editar e remover tarefas.
- Marcar tarefas como concluídas.
- **Histórico de estados**: Você pode desfazer e refazer ações, mantendo um controle do que foi feito.
- Persistência de dados local.
- Interface de usuário intuitiva e responsiva.
- **Feedback Tátil (Haptics)**: Para uma experiência mais imersiva e responsiva, utilizei feedback tátil em interações chave, como ao concluir uma tarefa, dando uma sensação física de confirmação ao usuário.

## 🛠️ Escolhas Técnicas

Para construir este app, utilizei algumas tecnologias e bibliotecas que considero muito eficientes. Veja o porquê de cada escolha:

- **React Native & Expo**: São a base do aplicativo. O Expo facilita muito o desenvolvimento com React Native, tirando a complexidade de configurar ambientes nativos e permitindo um desenvolvimento super rápido. Com ele, consigo fazer atualizações "over-the-air" e gerar builds para iOS, Android e Web de forma bem tranquila.
- **TypeScript**: Uso TypeScript para garantir a tipagem estática. Isso ajuda demais na manutenção do código, previne erros durante o desenvolvimento e melhora a experiência de quem está programando, com autocompletar e refatoração mais seguras.
- **Bun**: Escolhi o Bun como gerenciador de pacotes e runtime por sua performance superior em comparação com o npm/yarn. Além da velocidade, o Bun se mostrou mais robusto para lidar com certas dependências, como o `moti`, que apresentava dificuldades de compatibilidade e versionamento com o npm, garantindo um ambiente de desenvolvimento mais estável.
- **`@react-navigation`**: É a mais robusta e padrão para apps React Native, oferecendo uma API flexível para criar diferentes tipos de navegação (Stack, Tab, Drawer) e gerenciar o estado da navegação de forma eficiente.
- **Zustand**: Um gerenciador de estado leve e com ótimo desempenho. Optei por ele pela sua simplicidade, tamanho reduzido e por ter uma API baseada em hooks, o que facilita a integração com os componentes React e evita aquele código repetitivo desnecessário. **Ele foi fundamental para implementar o histórico de estados da nossa lista de tarefas, permitindo desfazer e refazer ações de forma eficiente.**
- **NativeWind (Tailwind CSS)**: Com ele, consigo escrever estilos CSS diretamente no JSX, usando a sintaxe do Tailwind CSS. Isso acelera o desenvolvimento da interface, ajuda a manter a consistência visual e torna a manutenção dos estilos muito mais fácil, sem precisar de arquivos CSS separados ou `StyleSheet.create`.
- **Moti & React Native Reanimated**: Essas bibliotecas são incríveis para criar animações fluidas e de alta performance. O `React Native Reanimated` executa as animações diretamente na thread UI nativa, garantindo 60 FPS mesmo em celulares mais antigos. Já o `Moti` oferece uma API declarativa e fácil de usar, construída em cima do Reanimated.
- **`@react-native-async-storage/async-storage`**: Uma solução simples e eficaz para guardar dados localmente no aparelho. É perfeita para armazenar o estado da lista de tarefas, garantindo que nada seja perdido quando o aplicativo é fechado.
- **ESLint & Prettier**: Ferramentas essenciais para manter a qualidade do código.
- **`expo-notifications`**: Utilizado para gerenciar notificações push no aplicativo. **Importante**: Este recurso funciona apenas nas versões mobile (iOS e Android) e não está disponível na versão web.

## 🤝 Convenções de Desenvolvimento

Para manter o código organizado e o histórico de commits claro, utilizamos [Semantic Commits](https://www.conventionalcommits.org/en/v1.0.0/). Isso significa que cada commit segue um padrão específico (ex: `feat: adiciona nova funcionalidade`, `fix: corrige bug`), o que facilita a compreensão das mudanças e a geração automática de changelogs.

## 🚀 Instalação

Para rodar este projeto no seu computador, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/todolist.git
    cd todolist
    ```
2.  **Instale as dependências:**
    ```bash
    // de preferência
    bun install
    # ou
    npm install
    ```

## ▶️ Rodando o Aplicativo

Depois de instalar tudo, você pode iniciar o aplicativo:

- **Para Android:**
  ```bash
  bun run android
  ```
- **Para iOS:**
  ```bash
  bun run ios
  ```
- **Para Web:**
  ```bash
  bun run web
  ```
- **Para iniciar o servidor de desenvolvimento (você poderá escolher a plataforma):**
  ```bash
  bun start
  ```
