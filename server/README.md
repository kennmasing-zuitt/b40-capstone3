# Server configuration

Set these environment variables in your shell or deployment secret manager before running `npm start` from `server/`:

- `STRIPE_SECRET_KEY`: your Stripe secret API key (use a test-mode key for development).
- `MONGODB_URI`: your MongoDB connection string.

Both variables are required and must not be empty. `.env.example` documents the names only; this application does not automatically load `.env` files. Do not paste credentials into source code, commits, or shell commands saved in history. Use your platform's secret manager or securely populate your process environment.

Previously hard-coded Stripe and MongoDB credentials must be revoked/rotated in their respective dashboards. Use replacements in every environment that runs this server. Never bypass GitHub push protection to publish the old credentials.
