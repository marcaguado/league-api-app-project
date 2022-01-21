# league-api-app-project
 Web application that uses League of Legends' API to retrieve player information

 How to use:
 -Install Deno in your computer
 -Create an account at https://developer.riotgames.com/ & get an API key 
 -In the file app.js find the variable "riotAPIKey" and paste your API key
 -Open a command line and from the root directory of the project type "deno run --unstable --allow-all app.js"
 -The application will be launched on port 7777 by default 
 
 Note: The application will crash if the summoner name doesn't exist or if the summoner doesn't have a rank, this will be fixed soon.
