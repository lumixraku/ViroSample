# ViroSample

## Installation
https://docs.viromedia.com/docs/quick-start

node(12+) watchman react-viro-cli react-native-cli is required.


## How to run?

### Official Version:
First `npm start`

then open Viro Media App on your device,

click `Enter Testbed` menu, then input http://{YOUR_MACHINE_IP}:/8081

### RN Version:

Run `./setup-ide.sh --android` in root path,

then run `npx react-native start ` in one terminal,  run `npx react-native run-android` in another terminal.

The rn start command would start a server listening on port 8081.


## About Codes
https://docs.viromedia.com/docs/tutorial-ar



## RN
It seems now(2020.3), RN recommned using `npx react-native` instead of  `react-native-cli`.
First upgrade Node to .12+

use `npx react-native` command not `react-native-cli` to create app.
(weird:  yarn install would failed to create demo app, while npm install is fine)


## ref
https://blog.jscrambler.com/getting-started-with-vr-in-react-native-with-viroreact/
https://marmelab.com/blog/2019/04/25/react-native-augmented-reality.html

unread:
https://dev.to/hasurahq/building-ar-apps-in-react-native-powered-by-graphql-using-hasura-h9m