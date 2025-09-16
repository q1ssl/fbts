// Environment configuration for different deployment stages

const config = {
  development: {
    API_BASE_URL: 'http://localhost:8000',
    ENVIRONMENT: 'development'
  },
  production: {
    API_BASE_URL: 'https://fbts.flamingohrms.com',
    ENVIRONMENT: 'production'
  }
};

// Determine current environment
const currentEnv = import.meta.env.MODE || 'development';

// Export the current config
export default config[currentEnv];

// Export all configs for manual selection
export { config };