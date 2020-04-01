/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import {
	AppRegistry,
	Text,
  View,
  ScrollView,
	StyleSheet,
	PixelRatio,
	TouchableHighlight
} from "react-native";

import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";

import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./js/app";
var reducers = require("./js/redux/reducers");

let store = createStore(reducers);

/*
 TODO: Insert your API key below
 */
var sharedProps = {
	apiKey: "API_KEY_HERE"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./js/HelloWorldSceneAR");
var InitialVRScene = require("./js/HelloWorldSceneVR");
var CARScene = require("./js/ARCarDemo/ARCarDemo");
var DrivingScene = require("./js/ARDrivingCarDemo/ARDrivingCarScene");
var PosterScene = require("./js/ARPosterDemo/ARPosterDemo");
var BizCardScene = require("./js/ARBusinessCard/BusinessCard");
var PhysicsScene = require("./js/ARPhysicsSample/BasicPhysicsSample");

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var FIGMENT_TYPE = "FIGMENT";
var OBJCAR_TYPE = "OBJ_CAR";
var DRIVING_CAR_TYPE = "DRIVING"
var BIZCARD_TYPE = "BIZCARD";
var POSTER_TYPE = "POSTER";
var PHYSICS_TYPE = "PHYSICS";


// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
	constructor() {
		super();

		this.state = {
			navigatorType: defaultNavigatorType,
			sharedProps: sharedProps
		};
		this._getExperienceSelector = this._getExperienceSelector.bind(this);
		this._getARNavigator = this._getARNavigator.bind(this);
		this._getVRNavigator = this._getVRNavigator.bind(this);
		this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
			this
		);
		this._exitViro = this._exitViro.bind(this);
	}

	// Replace this function with the contents of _getVRNavigator() or _getARNavigator()
	// if you are building a specific type of experience.
	render() {
		if (this.state.navigatorType == UNSET) {
			return this._getExperienceSelector();
		} else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
			return this._getVRNavigator();
		} else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
			return this._getARNavigator();
		} else if (this.state.navigatorType == FIGMENT_TYPE) {
			return this._getFigmentNavigator();
		} else if (this.state.navigatorType == OBJCAR_TYPE) {
			return this._getCARNavigator();
		} else if (this.state.navigatorType == DRIVING_CAR_TYPE) {
			return this._getDrivingCarNavigator();
		} else if (this.state.navigatorType == POSTER_TYPE) {
			return this._getPosterNavigator();
		} else if (this.state.navigatorType == BIZCARD_TYPE) {
			return this._getBizCardNavigator();
		} else if (this.state.navigatorType == PHYSICS_TYPE) {
			return this._getPhysicsNavigator();
		}

	}

	// Presents the user with a choice of an AR or VR experience
	_getExperienceSelector() {
		return (
			<View style={localStyles.outer}>
				<ScrollView style={localStyles.inner}>
					<Text style={localStyles.titleText}>
						Choose your desired experience:
					</Text>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>AR</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>VR</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(FIGMENT_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>Figment</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(OBJCAR_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>Tesla!</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(DRIVING_CAR_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>DRIVING_CAR_TYPE</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(BIZCARD_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>Biz Card</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(PHYSICS_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>PHYSICS</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={localStyles.buttons}
						onPress={this._getExperienceButtonOnPress(POSTER_TYPE)}
						underlayColor={"#68a0ff"}
					>
						<Text style={localStyles.buttonText}>Poster</Text>
					</TouchableHighlight>
				</ScrollView>
			</View>
		);
	}

	// Returns the ViroARSceneNavigator which will start the AR experience
	_getARNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: InitialARScene }}
				onExitViro={this._exitViro}
			/>
		);
	}

	// Returns the ViroSceneNavigator which will start the VR experience
	_getVRNavigator() {
		return (
			<ViroVRSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: InitialVRScene }}
				onExitViro={this._exitViro}
			/>
		);
	}

	_getFigmentNavigator() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}

	_getCARNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: CARScene }}
				onExitViro={this._exitViro}
			/>
		);
  }

  _getDrivingCarNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: DrivingScene }}
				onExitViro={this._exitViro}
			/>
		);
  }

  _getPhysicsNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: PhysicsScene }}
				onExitViro={this._exitViro}
			/>
		);
  }

  _getBizCardNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: BizCardScene }}
				onExitViro={this._exitViro}
			/>
		);
  }

  _getPosterNavigator() {
		return (
			<ViroARSceneNavigator
				{...this.state.sharedProps}
				initialScene={{ scene: PosterScene }}
				onExitViro={this._exitViro}
			/>
		);
  }


	// This function returns an anonymous/lambda function to be used
	// by the experience selector buttons
	_getExperienceButtonOnPress(navigatorType) {
		return () => {
			this.setState({
				navigatorType: navigatorType
			});
		};
	}

	// This function "exits" Viro by setting the navigatorType to UNSET.
	_exitViro() {
		this.setState({
			navigatorType: UNSET
		});
	}
}

var localStyles = StyleSheet.create({
	viroContainer: {
		flex: 1,
		backgroundColor: "black"
	},
	outer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "black"
	},
	inner: {
		marginHorizontal: 20,
		backgroundColor: "black"
	},
	titleText: {
		paddingTop: 30,
		paddingBottom: 20,
		color: "#fff",
		textAlign: "center",
		fontSize: 25
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 20
	},
	buttons: {
		height: 80,
		width: 150,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#68a0cf",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	},
	exitButton: {
		height: 50,
		width: 100,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#68a0cf",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff"
	}
});

module.exports = ViroSample;
