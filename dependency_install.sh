set -e

echo "Installing frontend dependencies..."
cd frontend
npm ci

echo "Installing backend dependencies..."
cd ../backend
npm ci

npm audit fix

echo "Setup complete!"