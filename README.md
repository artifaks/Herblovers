# Herb Harmony Monetization

A comprehensive monetization platform for herb-related content and services. This extension to the Herb Harmony platform enables subscription services, API access, and digital product sales. Built with React, TypeScript, Supabase, and Stripe integration.

## Monetization Features

- **Subscription Plans**: Tiered subscription services with different access levels
- **Subscription Dashboard**: User interface for managing subscription status and billing
- **API Service**: Monetized API access to herb data with usage limits and analytics
- **API Analytics**: Detailed usage statistics and performance metrics for API consumers
- **Stripe Integration**: Secure payment processing for subscriptions and one-time purchases
- **Digital Product Sales**: Sell ebooks and other digital content with secure delivery
- **Pricing Page**: Transparent pricing comparison for subscription and API plans
- **FAQ Page**: Comprehensive information about services and features
- **User Profiles**: User management with subscription and API key information

## Original Herb Harmony Features

- **Herb Database**: Browse and search through a collection of herbs with detailed information
- **Admin Dashboard**: Add and manage herbs in the database (admin access required)
- **Bulk Import**: Easily add multiple herbs at once
- **Authentication**: Secure admin access with Supabase authentication
- **Responsive Design**: Works on desktop and mobile devices
- **Ebook Store**: Purchase and download ebooks about herbs (integrated with Stripe)
- **Benefits Visualization**: Visual representation of each herb's benefits
- **Complementary Herbs**: Suggestions for herb combinations
- **Scientific Information**: Research-backed information about herb properties

## Technologies Used

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn UI for component library
- Supabase for authentication and database
- Supabase Edge Functions for serverless API endpoints
- Stripe for payment processing and subscription management
- Recharts for data visualization in analytics dashboards

## Getting Started

To run this project locally, you'll need Node.js and npm installed on your machine.

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/yourusername/herbharmony-monetization.git

# Step 2: Navigate to the project directory
cd herbharmony-monetization

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file with the following variables:
# STRIPE_SECRET_KEY=your_stripe_secret_key
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Step 5: Start the development server
npm run dev
```

## Environment Variables

The following environment variables are required:

- `STRIPE_SECRET_KEY`: Your Stripe secret key for payment processing
- `STRIPE_WEBHOOK_SECRET`: Secret for verifying Stripe webhook events
- `SUPABASE_URL`: URL of your Supabase project
- `SUPABASE_ANON_KEY`: Anon/public key for Supabase client
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for Supabase admin operations

## Deployment

This project can be deployed to any static hosting service that supports React applications. For the backend functionality, you'll need to deploy the Supabase Edge Functions to your Supabase project.

```sh
# Deploy Supabase Edge Functions
supabase functions deploy create-subscription-checkout
```

## License

MIT

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7c7bc0e5-a127-4fe8-a796-ac632cf93d7b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
