"use client";
import React from "react";
import { BlockPicker } from "react-color";

export default class ColorPicker extends React.Component {
  state = {
    background: "#fff",
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <BlockPicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
        colors={[
          "#FFFFFF",
          "#F47373",
          "#697689",
          "#37D67A",
          "#2CCCE4",
          "#555555",
          "#dce775",
          "#ff8a65",
          "#ba68c8",
        ]}
        id="colorOnePicker"
      />
    );
  }
}
