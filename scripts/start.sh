echo "Checking if dependencies are installed and satisfied"
echo ""
npm install
echo ""
echo "Changing linting check path"
git config core.hookspath = .githooks
echo "Path Changed"
echo ""
echo "Starting server:"
npm start
