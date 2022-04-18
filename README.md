Collaborators: Sierra, Lindsay, Myles, and Taeler.
Systems Project 2

Recipe Website

Hosted Site: https://comp3006recipewebsite.herokuapp.com/

Group 6 – Recipe Website Documentation
Lindsay Hunter, Myles Megaffin, Sierra Buckland, Taeler Burgess
Contents
Requirements	2
Hardware	2
Software/Others	2
Install Instructions	2
Application Structure	4
Set-Up Instructions	5
How to personalize	5
What settings need/recommend to be filled out	5
Customizations	6
Features List	7
CRUD a Recipe	7
Your Recipe Page	7
Images	7
Profiles	7
Login	7
FAQ	8
Screenshots	8
Credits	10

Requirements
Hardware
A Computer with:
Minimum 5GB of available space.
8GB of Ram 
A working Internet Connection 
Software/Others
Visual Studio Code (VSC) or another text editor with terminal functionality
Git downloaded and installed
A GitHub account
NodeJS installed – Install Instruction video: https://www.youtube.com/watch?v=km0mvNDaLRI&list=PLW7IVDer0bpZO5IKBgvd6yvr_l9e891f4&ab_channel=TheCodeBitesChannel  
GitHub Desktop
MongoDB Compass

Install Instructions
Go to the following link: https://github.com/SierraBuckland-student/COMP3006-RecipeWebsite 
Make a clone of the repo to your local computer using GitHub Desktop.
GitHub Desktop will open automatically, change the local path for your machine if you want, and then click “Clone”

From the GitHub desktop application click the “Open in Visual Studio Code” button. 


Open a new command terminal within Visual Studio Code (CTRL+SHFT+`)
Type the following command “nodemon” you should then see the message in the terminal “Connected Successfully to Database” 


Open an internet browser and navigate to http://localhost:3000/
You should see the homepage for the website! If you do, congrats! You are now ready to develop the website


Application Structure
When you open up the project you will see the following project structure:
.vscode and bin are defaults of the project and VSC. Do not touch them.
Config – holds the configuration files for the database connection, 3rd party authentication, and user roles. 
Models – the 2 objects in the project are recipe and user.
Users are the people who can have accounts. It holds things like username and password, their role, their profile image, etc. This is where you would add things like a user’s date or birth, a bio, username, etc. Any changes that affect a user’s object data structure or properties would be changed here.
Recipes hold the title, author, image, steps, type, etc. Any changes that affect a recipe object data structure or properties would be changed here. 
node_modules – the collection of all the npm packages and their files that are installed into the project. Never delete this folder or anything in it. 
Public – Hold 3 folders (Image, javascript, and stylesheets). The only important one is the stylesheets because if you are going to add any personalization (CSS changes) this is where you will have to put your file. The other 2 folders are empty. 
Routes – contains each of the major application endpoints (index, profile, recipes, etc.) which defines the way in which the client requests are handled from the browser. This includes what happens on a page load or creating/editing an object from the database. They are organized by the name of which object or page it will affect. For example, the recipe route will define all actions and URLs that have to do with recipes. 
Uploads – is the folder that holds all the images uploaded to the database. 
Views – Is the content layout that is displayed on each webpage on our website. What the user will see. 
App.js – Or otherwise known as the server file. It is where the application is configured that allows the functionality to happen. This includes adding the routes, models, database connection, authentication, etc. to our website. Think of it as the run file for our website. 
Package-lock, and package – automatically configured when you add or remove a npm package. It configures the packages to the website code. Do not touch these files. 
Set-Up Instructions
How to personalize
In the GitHub branch you will need to create a new branch that is named after your name. 
In GitHub desktop you will set your current branch to your branch. 
This is to ensure that main is untouched and that your code will not be pushed to production until it is ready.



What settings need/recommend to be filled out
Creating a testing user account
Launch the website 
In the top right of the landing page click the register link
Create a new user. Make it generic and something that can be easily remembered. 
This is so that you can access and test out the entire website and its features. 
It is also recommended that you add the administration login to your auto-fill so that you can switch between the 2 easily. 
Setting up a connection to the Database
Open up MongoDB Compass
Open up the config/config.js file.
Copy and paste the connection string in the config.js file into the MongoDB Compass sting window. 
Press the connect button. 
Navigate to database comp3033
Open up recipes collection
You are now able to view all the recipe objects in the database. 
Customizations
To personalize the website styles: 
Open the public/stylesheets folder
Create a new file with a unique name and is a .css file type (ex: style_AA.css)
In that new file is where you will add your style changes.
You will then open the views/layout.hbs file and in the head, you will add your stylesheet along with the others with a link tag. (ex: <link rel='stylesheet' href='/stylesheets/style_AA.css'/>

If you need to change the model object itself 
Open the model folder
Depending on which object you need to change (users or profile) you will open the correct file.
Make the changes to the object's properties as needed.
Navigate to the corresponding router file. 
In the put and post methods of that file add in the new model properties so that they are saved to the database.
In the corresponding form which the data is inputted to, add form the proper tags.
Test to make sure that your inputs are being added to the database (MongoDB).  

Website functionality
In the routes folder, open the file that corresponds to what you want to change (recipe.js for recipes, users.js for user profiles, etc.).
Create a new router or change a current router to the functionality you want. Make sure you are running nodemon and have your browser opened on http://localhost:3000/ so that you can see any changes in real time and can debug from there. 

Features List
CRUD a Recipe
Use – The ability to create, read (or view), update, and delete a recipe from the database (which most can only be done if logged in). 
Find/Functionality – in the routes/recipes.js file is where the multiple REST client methods are located (get, put, post, delete). Get is the ability to view the page and the recipe(s) in the database. Post will add a recipe and update them. Check the comments to see which each router does. It then needs to be initialized in the app.js file. In app.js they are imported to the file at the top, and initialized near the bottom. 
Your Recipe Page
Use – General page to show the user only the recipes they have uploaded to the recipe website.
Find/Functionality –  under routes/profile is where the route methods for the Your Recipes user page can be found. It includes a get method that displays the page of the user's recipe that they have uploaded. To edit or delete the user's recipes from this point the post and delete methods can be found in the routes/recipe.js file mentioned above in the CRUD recipe explanation.   
Images
Use – To be able to upload a photo to a recipe. 
Find/Functionality – In the routes/recipes.js file after the first initial get router there are 2 constant variables being defined. The storage variable is where the destination of the photos will be kept in our project (uploads/), and created a unique file name for each photo so there can never be duplicates. The upload variable is assigning the storage variable to the storage property. The single method call is saying that we are only uploading one single file that will be tagged as “img” (which is the form id input field for that tag). Then in the post router (create/edit), we add the upload variable to the middleware. This is only possible through downloading and importing a npm package called multer to the project and file. 
Profiles
Use – An individual user profile from the account the user created when registering the website.
Find/Functionality –  profile functionality can be found in the routes/profile.js file. It includes a get handler for displaying the user's profile page. A get handler for displaying the users “your recipe” page as mentioned above. Finally there is a post handler for editing and uploading any changes to the users account (email address, etc.).
Login
Use – The ability to log into a profile account and be able to access your information and recipes. Only when logged in can you add a new recipe, or edit and delete one of your old ones. 
Find/Functionality – It can be found in the routes/index.js file. The get router for login will load the page to the screen for the user. While the post router will check through passport authentication (a npm package) and its function (in the app.js) to see if the user is in the database already. If they are they will be logged in and will have access to the full functionality of the website. If the username or password does not exist in the database, they will be redirected back to the login page with an error message. 
Additional Updates (April 2022)
There wasn’t much added regarding features from our last documentation. For our last sprint, our main focus was to ensure that the recipe website looked great. What we have added is additional CSS to our current website. Previously, it was only the header and footer that were styled. Now, the rest of them have their own style to them, using the colour scheme that we selected.  To see the updated pages, take a look at the screenshots below. 
FAQ
What are the GitHub commands to run in the terminal if I don’t want to use GitHub Desktop?
git pull origin main = Pull current main branch 
git add . = add all files to the commit
git commit -m "message" = making a commit
git push = push to your branch
git push origin yourbranchname:main = push your branch to main
git checkout -b yourbranchname = create a new branch
git push -u origin yourbranchname = Push the local branch you made to remote repo
Why is the get route for recipe.js so long?
Due to the nature of MongoDB (our database) find function, if we want to allow for all of our options to be searched independently or joined together you need to create a new scenario (else if statement) for it. Which also means if you want to add a new filter (drop down menu) to the recipes index page you will need to create a new else if statement for each potential choice a user might make.
Why are there multiple CSS files?
Owing to the collaborative nature of this project, we found creating multiple CSS files the best way to allow everyone to tackle their individual CSS tasks remotely, without getting constant merge issues or interfering with others' styles. To simplify things, we each make our own CSS document and work within it  so there is no fear of overwriting each other’s work. 
Why do we use branches?
Branches are a good way to be able to make as many commits as you want, a way to save your progress, without cluttering up and potentially harming the main branch. The main branch is currently being hosted on a live server, so any changes made there will automatically be viewable from our users. 
Screenshots
Home Page- landing page for the website. Includes a recipe of the day. 
View a recipe page - how the recipe is displayed to the user
Index page of all recipes - shows all recipes in the database. 
Filtered view of the index page of all recipes
Login Page - how to login to your account. 
Add a recipe page- where you can create a new recipe
Profile main page - landing page for the user profile. 
A view of all of the recipes a user has created. Allows editing and delete. 
Change a profiles settings, username and profile image. 
Contact page - Where people can send us emails and get in contact with us. 
Credits
HTML and CSS knowledge: Julie-Ann Snache
Javascript frameworks knowledge: Eduardo Jaime
GitHub commands list: Sierra Buckland document from work
Filter/find guide: https://sqlserverguides.com/mongodb-find-multiple-values/ 
Image functionality: https://www.youtube.com/watch?v=sUUgbcHm_3c&ab_channel=SomTeaCodes 
Pulling a random document from MongoDB: https://www.tutorialspoint.com/get-random-record-from-mongodb 
W3Schools for additional HTML and CSS knowledge: https://www.w3schools.com/  

