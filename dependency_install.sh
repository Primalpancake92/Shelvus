set -e

echo "Installing frontend dependencies..."
cd frontend
npm ci

echo "Installing backend dependencies..."
cd ../backend
npm ci

echo "Setup complete!"