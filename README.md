# MaterialsManagement

## Minimum Node Version Required
12.x

## Project Setup
Navigate to backend directory using
`cd backend`
Install the packages using 
`npm install`


## Development server
Run using
`npm run dev`


This will create a EXPRESS NODE TS backend server running at `http://localhost:3000/` with an integrated REST API at `http://localhost:3000/api`
Data is stored in memory of the Node Server

To visit the Material Management Web Application built using Angular Custom Elements `@angular/custom-elements` open
`http://localhost:3000/custom`

Alternatively, to view it as an Angular Application open
`http://localhost:3000`



## About the development process
### UI
- Built using customized Angular Material components
- Used mainly Flex and Grid
- ngx-color-picker component library was used for color picker

### Application Logic
- Used NGRX module for managing state of the application and making the app more reactive
- Single State - Material State
- Follows optimistic approach the data is removed from the application state befor the server
- For handling unremoved and unsaved materials ngx-connection-service module is used to monitor the server connnection status.
- Contains Root and a lazy loaded feature module with a guard to prevent loading if any new or existing material is not set for upation
- Side effects like http requests and checking the connection status are handled by the NGRX Effects


### Server Logic
- Node TS with in memory data storage
- Used tsc compiler to target and target ES6
- Express Framework for handling routes
- Used Abstract class and static properties for preventing creation of multiple instance of the data model


## Deployment
Before deployment generate `JS` build using
`npm run prod`
or
integrate it to a CI/CD runner YAML configuration  

Use PM2 process manager in VM Instance with a nginx reverse proxy connecting the 8080 port to local 3000 and execute
`PM2 start app.yml`


    I have written some unit tests which are mostly angular generated. Most of the time was consumed in developing the UI and customizing the angular components
    Total Hours Taken: 8hrs
