# GamePaths

A React/Typescript application that helps users discover new video games through a personalized adventure selector and browse curated game collections.

## Project Inspiration

GamePaths was inspired by the challenge of discovering new video games in today's overwhelming market. Many gamers know what they enjoy but struggle to find their next favorite title. Traditional game stores and websites typically organize games by genre or release date, but this doesn't address how people actually choose games.

The "Choose Your Own Adventure" approach of GamePaths provides a more natural discovery experience. Instead of browsing endless lists, users answer a series of simple questions about their preferences, and GamePaths guides them toward games that match their system preferences and gaming style. This creates a journey of discovery rather than a simple search, making the process of finding new games enjoyable.

## Features

- Adventure Selector: Answer questions to get personalized game recommendations

- Game Discovery: Browse popular games and games by genre in a semi-"Choose Your Own Adventure" style

- Game Details: View information about each game

- Responsive Design: Works on desktop, tablet, and mobile

## Technologies Used

### Frontend Framework

- **React 19**: Utilizing the latest React features for building the user interface

- **TypeScript**: For type safety and improved developer experience

- **Vite**: Frontend tooling for faster development and optimized builds

### Styling

- **Tailwind CSS 4**: Utility-first CSS framework allowed to use very little classes and CSS

- **Custom animations**

### Routing and State Management

- **React Router**

- **React Hooks**

### API Integration

- **RAWG Video Games API**

## Getting Started

### Prerequisites

- Node.js

- pnpm package manager

### Installation

1. Clone the repository

```

git clone <repository-url>



cd gamepaths

```

2. Install dependencies

```

pnpm install

```

3. Copy provided .env file or acquire your own API Key from [RAWG API](https://rawg.io/apidocs)

4. Start the development server

```

pnpm dev

```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Project Structure

```

src/

├── components/ # Reusable UI components

│ ├── adventure/ # Adventure selector components

│ ├── games/ # Game-related components

│ └── ui/ # Generic UI components

├── pages/ # Page components

├── services/ # API services

├── types/ # TypeScript type definitions

├── utils/ # Utility functions and constants

├── App.tsx # Main App component with routing

└── main.tsx # Application entry point

```

## Build

To build the project for production:

```

pnpm build

```

## Testing Scripts

```

pnpm test

pnpm test:watch

pnpm test:coverage

```
