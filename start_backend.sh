# Starts the backend 
echo "Starting the backend on localhost..."
cd backend
cp .env.example .env
echo "Backend started on localhost."
node src/app