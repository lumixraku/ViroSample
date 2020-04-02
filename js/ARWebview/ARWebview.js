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



export default class ARWebview extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR.."
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
		console.log("this rootview..", this.refs["rootView"])
	}



	render() {
		return (
			<View ref="rootView" style={styles.outer}>
				<View
					style={{
						alignSelf: "stretch",
						height: 550,
						backgroundColor: "powderblue"
					}}
				>


					<WebView
						style={styles.webview}
						source={{
							uri: "https://google.com/"
						}}
					/>
				</View>
				{/* <WebView style={styles.webview} source={{ uri: "https://reactnative.dev/" }} /> */}
				{/* <ViroARSceneNavigator
					initialScene={{ scene: InitialARScene }}
				></ViroARSceneNavigator>
				 */}
			</View>
		);
	}

	_onInitialized(state, reason) {

		if (state == ViroConstants.TRACKING_NORMAL) {
			// Alert.alert("Alert Title", null, [
			// 	{ text: "Foo", onPress: () => console.log("Foo Pressed!") },
			// 	{ text: "Bar", onPress: () => console.log("Bar Pressed!") },
			// 	{ text: "Baz", onPress: () => console.log("Baz Pressed!") }
			// ]);
			console.log("....")
			this.setState({
				text: "Wow!"
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}


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
	helloWorldTextStyle: {
		fontFamily: "Arial",
		fontSize: 30,
		color: "#ffffff",
		textAlignVertical: "center",
		textAlign: "center"
	},
	webview: {
		height: 350,
		alignSelf: "stretch",
		backgroundColor: 'transparent',
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
