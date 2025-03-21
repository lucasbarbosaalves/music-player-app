# Music Player App - Spotify

The **Music Player App** is a web application developed in Angular that allows users to search, play, and manage music using the Spotify API.

## Features

- Search for songs, artists, and playlists.
- Music playback with play, pause, next, and back controls.
- Display search results in a stylized dropdown list.
- Recent search history.
- Integration with the Spotify API to fetch information and control playback.

## Technologies Used

- **Angular**: Framework for building the user interface.
- **TypeScript**: Programming language used in development.
- **SCSS**: CSS preprocessor for styling.
- **Spotify Web API**: API used for integration with Spotify.
- **Docker**: Tool for containerizing the application.
- **Docker Compose**: Tool for defining and managing multi-container Docker applications.

## Project Structure

- `src/app/components`: Contains the application components, such as `search`, `player-card`, and `right-bar`.
- `src/app/services`: Contains the application services, such as `spotify.service.ts` and `player.service.ts`.
- `src/app/interfaces`: Contains the interfaces used in the application.
- `src/app/commoms`: Contains helper functions and factories.
- `Dockerfile`: Configuration file to create the Docker image of the application.
- `docker-compose.yml`: Configuration file to orchestrate the Docker containers.

## How to Run the Project Locally

### Prerequisites

- Docker installed on the machine.
- Docker Compose installed on the machine.

### Steps to Run the Project

1. Clone this repository:

   ```sh
   git clone https://github.com/lucasbarbosaalves/music-player-app.git

   ```

2. Navigate to the project directory:

   ```sh
   cd music-player-app

   ```

3. Build and start the Docker container:

   ```sh
   docker-compose up --build

   ```

4. Open your browser and go to http://localhost:4200 to see the application running.
