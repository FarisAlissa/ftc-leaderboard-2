# FTC Leaderboard

This webapp is designed to be run locally in a Raspberry pi connected to a vertical tv screen (Like the tv screen mounted on the bookshelf in FTC HQ).

The purpose of app is to showcase the leaderboard from the FTC App using the FTC App backend as a data source.



## Prerequisites

To run this code you would need the following installed on your device:
* NodeJs
* NPM
* Yarn

## Commands

to run the code locally follow the next step:

* Build the libraries by running:
```bash
yarn
```
* Run the code in dev mode using:
```
yarn dev
```

to build the code run:
```
yarn build
```

## Setup

What I have done to run the web app on the raspberry pi is:

1. build the code
2. copy the build folder (usually found under `/dist`) to the Raspberry pi
3. install `nodejs`, and `npm` on the raspberry pi
4. install local web server on raspberry pi package to host the web app using this command
```bash
npm i -g local-web-server
```
5. navigate to the `dist` folder you copied on ***step 2*** 
6. run `ws --spa ./index.html`
7. go to ```localhost:8000``` on the browser and you should see the leaderboard

## NOTES
since the backend hasn't been changed you will face an issue where all requests to backend to get the users data will fail due to CORS.

what you can do in that case is run chromium in the raspberry pi using the command below which will disable CORS checks in the browser.

```bash
chromium-browser --disable-web-security --user-data-dir=/home/pi/Desktop --app=http://localhost:8000 --kiosk
```

this command should run chromium in full screen and open `localhost:8000` automatically. you should make this command run automatically on raspberry pi on startup "Google it :)"