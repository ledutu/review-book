# review-book

## Start project without Docker
### Project running process
* Step 1: Clone project
```
git clone https://github.com/ledutu/review-book.git
```
* Step 2: cd to project folder and run npm install
```
cd review-book
npm install
```
* Step 3: Run project by npm start
```
npm start
```
* Step 4: Open chrome and enter. Your computer had to be installed mongo before.

**Web**
```
http://localhost:3000/

```
**Database**
```
mongodb://localhost:27017
```

## Start project with Docker
### Project running process no need to set up environment
**_Note: Your compuder had to be installed docker before_**
* Step 1: Clone project
```
git clone https://github.com/ledutu/review-book.git
```
**For window:**
* Step 2: Build Dockerfile
```
docker build -t node-app-image .
```
* Step 3: Run docker-compose file
```
docker-compose up
```
**For Linux/Ubuntu**
* Step 2: Build Dockerfile
```
sudo docker build -t node-app-image .
```
* Step 3: Run docker-compose file
```
sudo docker-compose up
```
* Step 4: Open chrome and enter

**Web**
```
http://localhost:3000/
```
**Database**
```
mongodb://localhost:27018
```

## Page detail
* Coming soon.

## Process using git to push code
* Step 1: After pull code from master to your desktop
* Step 2: Create a new branch with command:
```
git branch [your new branch]. (Ex: git branch ledutu)
```
* Step 3: Go to that branch already created by using command:
```
git checkout [your already created branch]
```
* Step 4: Code in that branch
* Step 5: When you finish 1 task. Then push code in that branch to git
* Step 6: Create a new pull request to master. Done.

## Process push into git
* Step 1: Add
```
git add . (add all file into local)
```
* Step 2: Commit
```
git commit -m "<your message>" (commit into your local with a message) 
```
* Step 3: Push your code to server
```
git push.
```
_if first time you push, you must use this command_
```
git push --set-upstream origin <your branch>
```

