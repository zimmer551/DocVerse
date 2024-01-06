/*

Express: It acts as the intermediary between the frontend (built with React) and the database
- for server configuration.

- Routing :Express enables you to define routes for different endpoints of your API.
You can specify the HTTP method, URL path, and the corresponding handler function 
to execute when that route is accessed. Express supports various HTTP methods like GET, POST, PUT, DELETE, etc.

- Middleware Support: Express middleware functions can be used to perform operations on 
 incoming requests and outgoing responses. It allows you to add functionality in a modular way,
 such as parsing request bodies, handling authentication, logging, error handling, and more. 
 Middleware functions can be chained together to process requests in a specific order.

- API Handling: Express provides a straightforward way to define API endpoints and handle incoming requests. 
You can access request parameters, query strings, and request bodies to perform CRUD 
operations on your data stored in the database.

- DB interaction

EXPRESS and NODE in MERN stack : 
-Node.js as the runtime: Node.js is the JavaScript runtime environment that allows you to execute JavaScript code outside of a browser. 
-Express.js as the web application framework: It provides a set of features and APIs for building web servers and handling HTTP requests.
-Express.js handling routing and middleware: With Express.js, you can define routes for different endpoints of your API. 
-Integration with other components: It can handle API requests from the frontend built with React, 
connect to the MongoDB database using libraries like Mongoose, 
and serve static files or render views using template engines or React's server-side rendering.
You specify the HTTP methods, URL paths, and the corresponding handler functions for each route.

Nvm for 2 node versions
npm init -y command is a convenient way to initialize a new Node.js project with a default package.json 
Server.js -> main entry point
express : to create rest apis
morgan : logs endpoint and time to execute query
colors : add colors to console
dotenv : gives env variable, we save confidential data in .env files
nodemon : keep node.js code on in watch mode || HMR for node app
nodemon and HMR serve different purposes: nodemon is primarily used for automatically restarting the Node.js application
whereas HMR is a feature for dynamic module replacement in front-end development.
bcryptjs : encrypt pwd in hash format
Mongoose : simplifies the interaction with MongoDB in Node.js web applications, 
providing a high-level API and features for modeling, querying, and managing data

app.use() is used to register middleware that runs for every request, 
app.get() is used to define route handlers specifically for GET requests to specific routes.

Using MVC architecture
Create folder : route, controllers (callback fns), config, middlewares, models(schema designs due to no-sql db)

Initial config of server.js
 - get / request, and send 200 response, 
 - listned at port 8080

Made new React app inside client folder
 - Run at port 3000

the useNavigate hook provides a programmatic way to navigate between routes within a functional component.
 while the <Link> component is a declarative approach that creates anchor tags 
 with the necessary behavior for navigation. 

concurrently :  install in server app to run client and server app multiple port on same time
in client pkg.json, add proxy: localhost://8080 -> to avoid writing localhost://8080 multiple times during axios calls 



----- Connecting node app to mongo db -----
Create new DB (DocVerse) and collection (users).
Connect using VS code || using mongoDb compass 
write db config, call that connection function in server.js 

----- Creating REST API -----
Creating models : have validation strucure of the data that is to be saved in db. Exports collection name and schema name
Creating Routes : 
Creating controller : . Export controller fns.

in sever.js, we defined /api/v1/user and routed it to userRoute 
userRoute route /login and /register to respective controller


Save jwt after succesfull login

----- Creating Middleware -----
Create middleware to compare jwt, do routing if success in server side.


Made RequireAuth.js to protect client routing using jwt verification
if not verified, save location, redirect to login;
redirect to saved location after login, using useLocation hook;

Firebase:
 - Realtime Database: Firebase's Realtime Database is a NoSQL cloud-hosted database 
    that allows you to store and sync data in real time.
 - Authentication: Firebase Authentication provides easy-to-use authentication services
    , including email/password authentication, social media login (e.g., Google, Facebook, Twitter),
     and more. It simplifies user management and authentication in your MERN stack application.
 - Cloud Firestore: Firestore is a flexible and scalable NoSQL document database offered by Firebase. 
 - Cloud Storage
 - Hosting and Analytics  
 
React- routes v6.4 's data api , we use the Router’s loader() function to fetch the data before rendering the route element
 - use createBrowserRouter() to access data api
 - Data api : a data prop, which pprovide initial needed data, to corrosponding component, before rendering it
 - To use the AuthProvider within the router context, we’ll need to create an <AuthLayout />
   to wrap the outlet element with AuthProvider.This will enable all the child Routes to have access to auth context
 
Created Doctor schema, made it a model of user collection
Created doctor enrollment form 
create a new route or continue in user route in this case
create controller

in useEffect(() => {} , []); if i call a fetch fn, whose def is outside useEffect, that fn's ref changes on every rerender,
cause infinite loop, to avoid this, 
const getList = useCallback(() => {
    // Some logic to fetch data
  }, []);
  Using useCallback with an empty dependency array ensures that getList has a stable reference across renders,
   and it won't be considered as a changing dependency for the useEffect Hook.
  OR
  write fetch logic inside useEffect

 */