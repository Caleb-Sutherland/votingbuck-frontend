# README
## Running in Development
To run the votingbuck frontend in devlopment you must install the correct packages using "npm install". Running "npm install" will download packages such as:
* React Router
* ReCharts
* React Select
* React Redux
* Redux Thunk
* Tailwind CSS

Once this is complete, you can run "npm start" to start the development server.

## Deployment and Production
votingbuck is deployed on an AWS EC2 instance using NGINX, Docker, and Certbot, and AWS ECR.

### Docker
First, you must build a Docker image using the docker-compose.yml file. To build this image, navigate to the root of the project and run "docker-compose build". The docker-compose file uses the Dockerfile to produce a production build of the application with Alpine and Nginx called "votingbuck-frontend_server". Now that the image is created, you can focus on getting it onto the EC2 instance. 

### AWS EC2 and ECR
ECR is Amazon's elastic container registry, which is where the Docker image for voting buck will be stored and accessed by the EC2 instance. Before pushing the image to the ECR, you need to tag the image and request permission to push to the ECR where {AWS_ID} is the account ID associated with the server:
* docker tag votingbuck-frontend_server:latest {AWS_ID}.dkr.ecr.us-east-2.amazonaws.com/votingbuck-frontend_server:latest
* docker login --username AWS --password-stdin {AWS_ID}.dkr.ecr.us-east-2.amazonaws.com
* docker push {AWS_ID}.dkr.ecr.us-east-2.amazonaws.com/votingbuck-frontend_server:latest

Now to get the image from ECR onto the EC2 instance, you must login to EC2 via ssh. This requires the path to the .pem file (which is the key to login), the username (often "ec2-user") and the public domain of the EC2 instance (which can be found on the AWS dashboard).
* ssh -i {path_to_pemKey} {AWS_user}@{public_domain}

You must also request permission to pull from ECR while on EC2 using the previous command:
* docker login --username AWS --password-stdin {AWS_ID}.dkr.ecr.us-east-2.amazonaws.com

Then you can pull the image to EC2:
* docker pull {AWS_ID}.dkr.ecr.us-east-2.amazonaws.com/votingbuck-frontend_server:latest

Lastly, there is a docker-compose file already located on the EC2 instance that has been configured to run the container with its required volumes for the .env file and ssl certification. To run the application, run:
* docker-compose up

### SSL/TSL Certification with NGINX and Certbot
Certbot is used to generate the SSL certificates for votingbuck. The correct files can be generated using the command:
* certbot certonly --standalone -d dev.votingbuck.com --staple-ocsp

Certbot certificates expire after 90 days, so to handle this, there is cronjob setup on EC2 to autorenew the certificates on the second day of every month. To view this cronjob, use the commands:
* To view jobs: crontab -l 
* To edit jobs: crontab -e

To ensure that the application uses the Cerbot certificates, their locations must be specified in the nginx.conf file located at ./nginx/nginx.conf from the root of the project. These lines are located under the server listening on port 443 and look something like the following:
* ssl_certificate /etc/letsencrypt/live/dev.votingbuck.com/fullchain.pem;
* ssl_certificate_key /etc/letsencrypt/live/dev.votingbuck.com/privkey.pem;

The correct Docker volumes must be initialized on the running container for the application to be able to load these certificates.

## Inner Workings
### Folder Structure
The app is split up into the following folders under src:
* pages
	* Contains all page components such as a politician page, main page, or corporation page. These pages have components placed into them to display information.
* components
	* Contains all components such as headers, footers, loading screens, search bars, and select boxes.
	* Also contains sub folders that organize the graphs/tiles for politician, university, and corporation pages.
* constants
	* Contains files of constant variables, such as graph colours and extra colours that we might want to stay constant across the app.
* helper
	* Contains common helper functions such as number formatters, word capitilization, and a function to calculate all political periods up until today.
* interfaces
	* Contains all types/interfaces defined politicians, universities, and corporations when retreiving data from the api.
	* Also contains interfaces for interacting with the Redux Store.
* store
	* Contains all actions creators, actions, and reducers to work with the Redux Store.
### Graphs
Each graph works in a similar way. The graph will first check what the specified political period is, then see if that period's data for the current politician/university/corporation is in the redux store. If the data is there, then it will display it in the graph, otherwise, it will fetch the data from the api and store it in the redux store. When a period of data is fetched from the api, it fetches all of the data for all of the graphs for that period, so that any other graphs that switch to that same period will already have the data available. For more information on the graphs, please refer to the Rechart Documentation: https://recharts.org/en-US/api.

### Redux
Redux is used in this application to store all of the data related to the graphs on any of the pages. The store is split up into three sections: politicians, universities, and corporations. Each section holds their respective type (a list of politicians, universities, or coporations), and each of those contain a dictionary of political periods, which contain all of the data for the graphs. To get a better visual of how the redux store is organized, you can install the Chrome redux devtools extension (https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to view the store in your inspector.

To handle making asynchronous calls during an action, the app makes use of Redux Thunk (https://www.npmjs.com/package/redux-thunk). Redux Thunk is a middleware used when creating actions to allow asynchronous calls to occur before dispatching to the reducer.

### Types and Interfaces
Types and interfaces have been defined mostly for handling api calls and organizing data in the Redux Store. Interfaces are used to ensure that the data being recieved from the api follows the expected format, allowing the graphs to be rendered correctly. Further, the entire structure of the Redux Store can be broken down into types/interfaces defined in the "interfaces" folder.

### Tailwind CSS
Tailwind CSS has been used to style nearly all of the application so far. Some of the graphs and libraries do not allow Tailwind colours to configure their settings, so that is why there is a "graph_colours" constant in the "constants" folder. Otherwise, most colours and styling use Tailwind. Custom mappings can be found and created in the Tailwind configuration file (tailwind.config.js) located at the root of the project. Tailwind also has extensive documentation to help with beginners: https://tailwindcss.com/docs/installation.