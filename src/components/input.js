import React from "react";

export class TextInput extends React.Component {
  change_handler = (event) => {
    this.setState({ value: event.target.value });
  };

  render(props) {
    return (
      <input
        type="text"
        onChange={props.change_handler}
        value={this.state.value}
      ></input>
    );
  }
}
