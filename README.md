## Prerequisites
#### NodeJS
https://nodejs.org/en/

#### MySQL
https://www.mysql.com/

## Installing
Clone the repository

```
git clone https://github.com/spb2445/kansas-city-tow-lots.git
cd kansas-city-tow-lots
```
After cloning the repository run npm install in the root directory and run npm install in the client folder

```
npm install
cd client
npm install
```

## Local Development

1. Hook up to MySQL
2. Node server in the root directory
3. React UI in client folder

Update server/index.js file to link to your MySQL server

```
let user = process.env.production_user || "root" // replace root with your username
let password = process.env.production_password || "root" // replace root with your password
```

Run the server in the terminal
```
node server/index.js
// or
nodemon server/index.js
```

In a separate terminal run the React App
```
cd client
npm start
```

### Available Data
https://data.kcmo.org/Traffic/Kansas-City-Monthly-Car-Auction/2uje-k9n5

### Available Photos
http://oaiauctions.hibid.com/
