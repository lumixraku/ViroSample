"use strict";

import React, { Component } from "react";

import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Image,
	Dimensions
} from "react-native";
import { WebView } from "react-native-webview";
import {
	ViroARScene,
	ViroText,
	ViroBox,
	ViroConstants,
	ViroMaterials,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroARPlaneSelector,
	ViroNode,
	ViroAnimations,
	ViroARSceneNavigator
} from "react-viro";
import RNFetchBlob from "rn-fetch-blob";

import  InitialARScene from "./HelloSceneAR";

var stageWidth = Dimensions.get('window').width; //full width
var stageHeight = Dimensions.get('window').height; //full height
var bottomHeight = 200;
var absViewHeight = stageHeight - bottomHeight;
var webviewURL = "http://10.12.167.120:5001/";

var testReadFileURL = `/storage/emulated/0/Pictures/bili/screenshot/181480@1581854531@2.png`

export default class ARWebview extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR..",
			imageData:
				"iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="
		};

		// bind 'this' to functions
		console.log("this rootview..", this.refs["rootView"])


		setTimeout(() => {
			this.setToWebview();
		}, 1000);
	}


	setToWebview(){
		// this.readFileAsBase64(testReadFileURL)
		this.readFileAsUtf8(testReadFileURL).then((res)=> {
			res = 'hahah'
			var runJS = `
				console.log("injected!")
				window.GLOBAL_VAR.imgdata = "${res}";
				true;
			`;
			if (this.webref) {
				console.log("injected", runJS)
				this.webref.injectJavaScript(runJS);
			}
		})
	}

	postToWebview(){
		var runJS = `
			window.postMessage("jajajajajja")
		`;
		this.webref.injectJavaScript(runJS);
	}

	onMessage(event) {
		console.log("RCT  recevice event", event.nativeEvent.data);
	}

	readFileAsBase64(fileURL) {
		return RNFetchBlob.fs.readFile(fileURL, "base64").then(data => {
			// handle the data ..
			console.log("file data", data);
			this.setState({
				imageData: data
			});
		});
	}

	readFileAsUtf8(fileURL) {
		return RNFetchBlob.fs.readFile(fileURL, "utf8").then( (data) => {
			// handle the data ..
			console.log("file data", data);

			this.setState({
				imageData: data
			});

			return data;
		});
	}

	render() {

		// 这里还是属于 页面向 RN 发送数据  只不过页面的数据是 RN 通过inject 方式引入
		const INJECTED_POST_JS_FIRST = `(function() {
				setTimeout(function(){
					window.ReactNativeWebView.postMessage(JSON.stringify( { lo: "lololo" } ));
				}, 1000)
				true;
		})();`;

		const RUNFIRST = `
      document.body.style.backgroundColor = 'red';
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;

		return (
			<View ref="rootView" style={styles.outer}>
				<View style={styles.bgView}>
					{/* {this.state.imageData ? ( */}
						<View style={styles.bottomView}>
							<Image style={styles.imageStyle} source={{uri: "data:image/png;base64," + this.state.imageData}} />
						</View>
					{/* ) : null} */}
				</View>
				{/* <ViroARSceneNavigator
					style={styles.bgView}
					initialScene={{ scene: InitialARScene }}
				></ViroARSceneNavigator> */}

				<View style={styles.absView}>
					<WebView
						ref={r => (this.webref = r)}
						style={styles.webview}
						injectedJavaScript={INJECTED_POST_JS_FIRST}
						onMessage={this.onMessage}
						source={{
							uri: webviewURL
						}}
					/>
				</View>

				{/* <WebView style={styles.webview} source={{ uri: "https://reactnative.dev/" }} /> */}
			</View>
		);
	}

}

var styles = StyleSheet.create({
	outer: {
		flex: 1,
		backgroundColor: "#aaa",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "stretch"
	},
	absView: {
		width: stageWidth,
		height: absViewHeight,
		// backgroundColor: "yellow",
		position: "absolute",
		top: 0
	},
	bgView: {
		flex: 1,
		alignSelf: "stretch",
		flexDirection: "column",
		height: stageHeight,
		backgroundColor: "powderblue",
		justifyContent: "flex-end"
	},
	helloWorldTextStyle: {
		fontFamily: "Arial",
		fontSize: 30,
		color: "#ffffff",
		textAlignVertical: "center",
		textAlign: "center"
	},
	webview: {
		height: absViewHeight,
		// alignSelf: "stretch",
		width: stageWidth,
		backgroundColor: "transparent"
	},
	bottomView: {
		backgroundColor: "yellow",
		height: bottomHeight,
		width: stageWidth,
		justifyContent: "flex-start",
		flex: 0
	},
	imageStyle: {
		height: 100,
		width: 160,
		borderWidth: 5,
		borderColor: "black"
	}
});

ViroAnimations.registerAnimations({
	rotate: {
		properties: {
			rotateY: "+=90"
		},
		duration: 250 //.25 seconds
	}
});
module.exports = ARWebview;
