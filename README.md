# Hacker News API

This project is a small application built with NestJS framework that interacts with the public API of Hacker News. It provides three endpoints to retrieve information about the top occurring words in the titles of Hacker News stories.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hacker-news-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hacker-news-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the Application

To start the NestJS server, run:

```bash
npm run start:dev
```

The server will start at http://localhost:3000 by default.

### Endpoints

1. Top 10 most occurring words in the titles of the last 25 stories

   ```bash
   GET /topWords/last25Stories
   ```

2. Top 10 most occurring words in the titles of the posts of exactly the last week

   ```bash
   GET /topWords/lastWeekStories
   ```

3. Top 10 most occurring words in titles of the last 600 stories of users with at least 10,000 karma

   ```bash
   GET /topWords/highKarmaStories
   ```

## Testing

To run the tests, use the following command:

```bash
npm run test
```

## Dependencies

NestJS, Axios

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or feature suggestions.

## License
This project is licensed under the MIT License.
