import React from "react";
import "./App.css";
import app_fonts from "./AppFonts.js";
import ColorScheme from "./ColorScheme";
import Pane from "./components/Pane";
import Tile from "./components/Tile";
import PingConfig from "./components/PingConfig";
import AtAGlance from "./components/AtAGlance";
import Monitor from "./components/Monitor";
import Scrollbars from "react-custom-scrollbars";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pingbursts: [],
    };
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = ColorScheme.get_color("bg0");
    body.style.boxSizing = "border-box";
    body.style.margin = "0";
    for (const key in app_fonts) {
      body.style[key] = app_fonts[key];
    }

    //update pingbursts func
    // setInterval(async () => {
    //   let request_opts = {
    //     method: "GET",
    //     mode: "cors",
    //   };
    //   const res = await fetch("pingbursts", request_opts);
    //   // const body = JSON.parse(res.body);
    //   const pingbursts = await res.json();
    //   this.setState({ pingbursts });
    //   console.log(pingbursts);
    // }, 5000);
  }

  render() {
    return (
      <Scrollbars style={{ height: "100vh", width: "100vw" }}>
        <div className="top_vstack">
          <h1 className="dash_title">Your Wi-SUN Network</h1>
          <div className="pane_container">
            <Pane>
              <div className="tile_container_full tile_container_common">
                <Tile title="Topology"></Tile>
              </div>
              <div className="tile_container_full tile_container_common">
                <Tile title="IP Addresses"></Tile>
              </div>
            </Pane>
            <Pane>
              <div className="tile_container_hstack tile_container_common">
                <div className="tile_container_half">
                  <Tile title="Ping Config">
                    <PingConfig />
                  </Tile>
                </div>
                <div className="tile_container_half">
                  <Tile title="At A Glance">
                    <AtAGlance />
                  </Tile>
                </div>
              </div>
              <div className="tile_container_full tile_container_common">
                <Monitor />
              </div>
            </Pane>
          </div>
        </div>
      </Scrollbars>
    );
  }
}
