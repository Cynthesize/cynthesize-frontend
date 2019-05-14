read -p "Enter the name of branch you want to deploy: " branch_name
git checkout $branch_name
git pull origin $branch_name
npm install -g @angular/cli
ng build --prod --aot
cd ..
rm -rf cynthesize/dist
echo "Moving files to host distribution folder..."
mv cynthesize-frontend/dist cynthesize
echo "Removing development index.html..."
rm cynthesize/dist/index.html
echo "Copying production index.html..."
cp index.html cynthesize/dist
cd cynthesize
gcloud app deploy
