# Kite Flying Weather Web App

A Web App designed for Kite Flyers.

```
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
* Graphical User Interfaces - Group Project                                  *
* February 2019                                                              *
* Queen Mary University of London                                            *
*                                                                            *
* @Authors Alberto Morabito                                                  *
*          Nadia Goodlet                                                     *
*          Olha Lyubinets                                                    *
*          Tasnia Khan                                                       *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  *
```

## Get started

- Register a new account on http://aerisweather.com/ and save the Client ID and Secret for later
- Clone this repository
- `cd` to the repo and run `npm i`
- Create an `.env.local` file and add the following variables:

```
REACT_APP_CLIENT_ID=<your ID>
REACT_APP_CLIENT_SECRET=<your secret>
```

One variable per line, no spaces.

- Replace `<your ID>` with your ID, same for secret.
- Finally, to start the server run `npm start`

Frameworks used:

- React.js
- Node.js
- AerisWeather API
- Material-UI


## Screenshots
White areas on the wind visualisation and grey kite represent times when you cannot fly a kite. When the graph area becomes green, the kite changes colours and it signifies that the weather is suitable for kite flying.
![weather](https://user-images.githubusercontent.com/17802955/54031224-0d98b900-41a6-11e9-974a-e88b5084e586.jpg)

