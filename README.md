# BookReads - Book Recommendation Website

BookReads is a responsive web application designed to help users discover, organize, and track their reading journey. With features like genre filtering, favorites, reading lists, and personalized recommendations, BookReads offers a complete platform for book lovers. ![BookReads Screenshot](screenshot.png)

## Overview

BookReads includes features like browsing books with cover images and detailed info, filtering by genre and mood, a swipe-based recommendation interface, and a "Surprise Me" button. Users can build a personal library, add books to favorites, create custom reading lists, drag-and-drop wishlist items, and track their reading progress. Each book detail page includes comprehensive info, similar recommendations, rating and review systems, and metadata like pages, publisher, and ISBN. The app offers a responsive design with dark/light mode, reading analytics, and challenge tracking.

## Technology Stack

BookReads is built using Next.js, React, and Tailwind CSS. It uses shadcn/ui components, Lucide React icons, and React Hooks for state management.

## Getting Started

To get started, ensure you have Node.js (v18.0.0 or higher) and npm or yarn installed. Clone the repository using:
```bash
git clone https://github.com/yourusername/book-recommendation.git
cd book-recommendation
```
Install the dependencies with:
```bash
npm install
# or
yarn install
```
Start the development server using:
```bash
npm run dev
# or
yarn dev
```
Then open your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project is structured as follows:
```
book-recommendation/
├── app/                  # Next.js app directory
│   ├── book/[id]/        # Book detail pages
│   ├── discover/         # Discovery page
│   ├── lists/            # Reading lists page
│   ├── profile/          # User profile page
│   ├── wishlist/         # Wishlist page
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── book-card.tsx     # Book card component
│   ├── book-discovery.tsx # Book discovery component
│   └── ...               # Other components
├── lib/                  # Utility functions and data
│   ├── actions.ts        # Server actions
│   ├── data.ts           # Sample book data
│   └── types.ts          # TypeScript types
├── public/               # Static assets
│   └── images/           # Book cover images
└── README.md             # Project documentation
```

## Deployment

You can deploy BookReads using Vercel by pushing your code to GitHub, connecting it to Vercel, and clicking deploy. For manual deployment, build the project using:
```bash
npm run build
# or
yarn build
```
Then start the production server with:
```bash
npm start
# or
yarn start
```

## Future Enhancements

Planned features include user authentication, integration with external book APIs, social sharing options, advanced search functionality, a mobile app version, and enhanced reading progress tracking.

## Contributing

To contribute, fork the repo, create a feature branch (`git checkout -b feature/your-feature`), commit your changes (`git commit -m 'Add your feature'`), push to the branch (`git push origin feature/your-feature`), and open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

Book cover images are placeholders and should be replaced with actual covers. Sample data is for demonstration purposes only.
