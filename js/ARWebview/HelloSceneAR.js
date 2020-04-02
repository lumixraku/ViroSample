'use strict';

import React, { Component } from 'react';

import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from "react-native";

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
} from "react-viro";

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroNode
					position={[0, -1, 0]}
					dragType="FixedToWorld"
					onDrag={() => {}}
				>
					<Viro3DObject
						source={require("./res/emoji_smile/emoji_smile.vrx")}
						resources={[
							require("./res/emoji_smile/emoji_smile_diffuse.png"),
							require("./res/emoji_smile/emoji_smile_normal.png"),
							require("./res/emoji_smile/emoji_smile_specular.png")
						]}
						position={[0, 0.5, 0]}
						scale={[0.2, 0.2, 0.2]}
						type="VRX"
					/>
				</ViroNode>

				<ViroText
					text={this.state.text}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					style={styles.helloWorldTextStyle}
				/>
				<ViroBox
					position={[0, -0.5, -1]}
					scale={[0.3, 0.3, 0.1]}
					materials={["grid"]}
					animation={{ name: "rotate", run: true, loop: true }}
				/>

				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroSpotLight
					innerAngle={5}
					outerAngle={90}
					direction={[0, -1, -0.2]}
					position={[0, 3, 1]}
					color="#ffffff"
					castsShadow={true}
				/>
				<Viro3DObject
					source={require("./res/emoji_smile/emoji_smile.vrx")}
					resources={[
						require("./res/emoji_smile/emoji_smile_diffuse.png"),
						require("./res/emoji_smile/emoji_smile_normal.png"),
						require("./res/emoji_smile/emoji_smile_specular.png")
					]}
					position={[0, 0, -1]}
					scale={[0.2, 0.2, 0.2]}
					type="VRX"
				/>
			</ViroARScene>
		);
  }

  _onInitialized(state, reason) {


    if (state == ViroConstants.TRACKING_NORMAL) {

      this.setState({
        text : "Wow!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
	  // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
ViroMaterials.createMaterials({
	grid: {
		diffuseTexture: require("./res/grid_bg.jpg")
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
module.exports = HelloWorldSceneAR;
