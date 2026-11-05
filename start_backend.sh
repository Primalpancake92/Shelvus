# Starts the backend 
echo "Starting the backend on localhost..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
fi
echo "Backend started on localhost."
node src/app
