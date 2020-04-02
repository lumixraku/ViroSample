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
export default class ARWebview extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR.."
		};

		// bind 'this' to functions
		console.log("this rootview..", this.refs["rootView"])
	}



	render() {
		return (
			<View ref="rootView" style={styles.outer}>
				<View style={styles.bgView}></View>

				<View style={styles.absView}>
					<WebView
						style={styles.webview}
						source={{
							uri: "https://google.com/"
						}}
					/>

				</View>
				{/* <ViroARSceneNavigator
					style={styles.bgView}
					initialScene={{ scene: InitialARScene }}
				></ViroARSceneNavigator> */}


				{/* <WebView style={styles.webview} source={{ uri: "https://reactnative.dev/" }} /> */}
				{/*
				 */}
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
