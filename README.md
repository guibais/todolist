# 🚀 TodoList App

Um aplicativo de lista de tarefas simples e elegante, construído com React Native e Expo, focado em uma experiência de usuário fluida e moderna.

## ✨ Features

- Adicionar, editar e remover tarefas.
- Marcar tarefas como concluídas.
- Persistência de dados local.
- Interface de usuário intuitiva e responsiva.

## 🛠️ Escolhas Técnicas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas, com as justificativas para suas escolhas:

-   **React Native & Expo**: A base do aplicativo. Expo simplifica o desenvolvimento React Native, abstraindo a complexidade de configurar ambientes nativos e permitindo um desenvolvimento rápido com recursos como "over-the-air updates" e fácil build para múltiplas plataformas (iOS, Android, Web).
-   **TypeScript**: Utilizado para tipagem estática, o TypeScript melhora a manutenibilidade do código, ajuda a prevenir erros em tempo de desenvolvimento e oferece uma melhor experiência para o desenvolvedor com autocompletar e refatoração.
-   **`@react-navigation`**: A biblioteca padrão e mais robusta para navegação em aplicativos React Native. Oferece uma API flexível para criar diferentes tipos de navegação (Stack, Tab, Drawer) e gerenciar o estado da navegação de forma eficiente.
-   **Zustand**: Um gerenciador de estado leve e performático. Foi escolhido por sua simplicidade, tamanho reduzido e API baseada em hooks, que facilita a integração com componentes React e evita "boilerplate" desnecessário.
-   **NativeWind (Tailwind CSS)**: Permite escrever estilos CSS diretamente no JSX, utilizando a sintaxe do Tailwind CSS. Isso acelera o desenvolvimento da UI, promove a consistência visual e facilita a manutenção dos estilos, eliminando a necessidade de folhas de estilo separadas ou `StyleSheet.create`.
-   **Moti & React Native Reanimated**: Bibliotecas poderosas para criar animações fluidas e de alta performance. `React Native Reanimated` executa animações na thread UI nativa, garantindo 60 FPS mesmo em dispositivos mais antigos, enquanto `Moti` oferece uma API declarativa e fácil de usar construída sobre o Reanimated.
-   **`@react-native-async-storage/async-storage`**: Uma solução simples e eficiente para persistir dados localmente no dispositivo. Ideal para armazenar o estado da lista de tarefas, garantindo que os dados não sejam perdidos ao fechar o aplicativo.
-   **ESLint & Prettier**: Ferramentas essenciais para manter a qualidade do código. ESLint garante que o código siga padrões de estilo e evita erros comuns, enquanto Prettier formata o código automaticamente, garantindo consistência em todo o projeto.

## 🚀 Instalação

Para rodar este projeto localmente, siga os passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/todolist.git
    cd todolist
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

## ▶️ Rodando o Aplicativo

Após a instalação das dependências, você pode iniciar o aplicativo:

-   **Para Android:**
    ```bash
    npm run android
    ```
-   **Para iOS:**
    ```bash
    npm run ios
    ```
-   **Para Web:**
    ```bash
    npm run web
    ```
-   **Para iniciar o servidor de desenvolvimento (com opções para escolher a plataforma):**
    ```bash
    npm start
    ```

## 📜 Scripts Disponíveis

-   `npm start`: Inicia o servidor de desenvolvimento do Expo.
-   `npm run android`: Inicia o aplicativo no emulador/dispositivo Android.
-   `npm run ios`: Inicia o aplicativo no simulador/dispositivo iOS.
-   `npm run web`: Inicia o aplicativo no navegador web.
-   `npm run prebuild`: Prepara o projeto para builds nativos.
-   `npm run lint`: Executa o linter e o verificador de formatação.
-   `npm run format`: Corrige automaticamente problemas de lint e formatação.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
