# Ownly - Product Rental Platform for SNU Community

Welcome to Ownly, a website where the SNU community can rent, list, and request products. Ownly is built using Next.js and Supabase to provide a seamless experience for product rentals within the university community.

## Features

- **User Authentication**: Secure login, signup, and logout functionality.
- **Product Listing**: Users can list products they want to rent out.
- **Product Requests**: Users can request specific products they need.
- **Community Focused**: Exclusively designed for the SNU community.
- **Real-time Data**: Integration with Supabase for real-time database updates.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Supabase Account](https://supabase.io/)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   cd ownly
   ```

2. Install dependencies:

   ```bash
   npm install
   or
   yarn install
   ```

3. Configure environment variables:

    Create a `.env.local` file in the root of your project and add the following environment variables:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL='YOUR_SUPABASE_URL'
    NEXT_PUBLIC_SUPABASE_ANON_KEY='YOUR_SUPABASE_ANON_KEY'
    ```

4. Start the development server:

    ```bash
    npm run dev
    or
    yarn dev
    ```

5. Your application should now be running at [http://localhost:3000](http://localhost:3000).

## Usage

- **Product Management**: Users can list products they want to rent out and browse or request products listed by others.
- **User Authentication**: Implemented using Supabase Auth for secure and easy authentication.
- **Real-time Updates**: All changes to product listings and requests are updated in real-time using Supabase.

## Deploying

To deploy Ownly, follow the deployment instructions for your chosen hosting platform. Popular options include:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

Ensure that your environment variables are set correctly on your hosting platform.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [AWS Amplify Deployment Guide](https://docs.amplify.aws/)

Thank you for choosing Ownly! We hope you enjoy using our platform to rent and list products within the SNU community. If you have any questions or need further assistance, please feel free to contact us.