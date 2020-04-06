# ViroSample

## Installation
https://docs.viromedia.com/docs/quick-start

node(12+) watchman react-viro-cli react-native-cli is required.

![image](https://raw.githubusercontent.com/lumixraku/ViroSample/master/webpage/Screenshot1.jpg)


## How to run?

### Official Version:
First `npm start`

then open Viro Media App on your device,

click `Enter Testbed` menu, then input http://{YOUR_MACHINE_IP}:/8081

### RN Version:

Run `./setup-ide.sh --android` in root path,

then run `npx react-native start ` in one terminal,  run ` npx react-native run-android --variant=gvrDebug ` in another terminal.

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

## release



keytool -genkeypair -v -keystore my-release-key.keystore -alias my-viro-alias -keyalg RSA -keysize 2048 -validity 10000
```
What is your first and last name?
  [1]:  hhhhhho
What is the name of your organizational unit?
  [1]:  njcdnjdc
What is the name of your organization?
  [1]:  kscsklpwpw
What is the name of your City or Locality?
  [1]:  weo
What is the name of your State or Province?
  [1]:  nwkwp
What is the two-letter country code for this unit?
  [1]:  CN
Is CN=hhhhhho, OU=njcdnjdc, O=kscsklpwpw, L=weo, ST=nwkwp, C=CN correct?
  [no]:  yes

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
	for: CN=hhhhhho, OU=njcdnjdc, O=kscsklpwpw, L=weo, ST=nwkwp, C=CN
Enter key password for <my-viro-alias>
	(RETURN if same as keystore password):
123456
```

package an apk file
it would generate multiple apks, please use apk in ar/release
```
cd android
$ ./gradlew assembleRelease
```

## debug
```
adb shell input keyevent 82
```
## Trouble

### hot reload failed
https://github.com/facebook/react-native/issues/4357
https://github.com/facebook/react-native/issues/10889

## blob
https://stackoverflow.com/questions/38506971/react-native-populate-image-with-blob-that-has-been-converted-to-a-url
https://github.com/facebook/react-native/issues/21731

https://stackoverflow.com/questions/48747278/is-it-possible-to-get-the-binary-data-from-an-image-in-react-native
https://www.jianshu.com/p/30291a34fdef

## debug webview
https://medium.com/@keremcubuk/debugging-webview-on-react-native-879ef029ef09