# Starting the frontend.
echo "Starting the Frontend on localhost..."
cd frontend
if [ ! -f .env ]; then
    cp .env.example .env
fi
echo "Frontend on localhost started."
npm run dev
