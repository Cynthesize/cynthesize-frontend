echo "Installing missing dependencies..."
npm install 
echo "Setting githooks for precommit linting..."
git config core.hookspath = .githooks
echo "Starting angular server"
ng serve