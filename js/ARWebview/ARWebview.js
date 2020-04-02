"use strict";

import React, { Component } from "react";

import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
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

import  InitialARScene from "./HelloSceneAR";

import { Dimensions } from "react-native";
var stageWidth = Dimensions.get('window').width; //full width
var stageHeight = Dimensions.get('window').height; //full height
var absViewHeight = 650
var webviewURL = "http://10.12.167.120:5001/";
export default class ARWebview extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR.."
		};

		// bind 'this' to functions
		console.log("this rootview..", this.refs["rootView"])


		setTimeout(() => {
			this.setToWebview();
		}, 1000);
	}


	setToWebview(){
		var runJS = `
			window.GLOBAL_VAR.aa = 11;
			true;
		`;
		this.webref.injectJavaScript(runJS);

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
				<View style={styles.bgView}></View>

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
				{/* <ViroARSceneNavigator
					style={styles.bgView}
					initialScene={{ scene: InitialARScene }}
				></ViroARSceneNavigator> */}

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
		alignSelf: "stretch",
		height: stageHeight,
		backgroundColor: "powderblue"
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
