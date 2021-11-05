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
import IPAddressTable from "./components/IPAddressTable";
import Topology from "./components/Topology";
import produce from "immer";

function nickname_generator() {
  const nicknames = [
    "Alfa",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo",
    "Foxtrot",
    "Golf",
    "Hotel",
    "India",
    "Juliett",
    "Kilo",
    "Lima",
    "Mike",
    "November",
    "Oscar",
    "Papa",
    "Quebec",
    "Romeo",
    "Sierra",
    "Tango",
    "Uniform",
    "Victor",
    "Whiskey",
    "X-ray",
    "Yankee",
    "Zulu",
  ];
  const index = Math.floor(Math.random() * nicknames.length);
  return nicknames[index];
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topology: { nodes: [], edges: [] },
      ip_address_info_array: [],
      pingbursts: [],
    };
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = ColorScheme.get_color("bg0");
    body.style.boxSizing = "border-box";
    body.style.margin = "0";
    for (const key in app_fonts) {
      body.style[key] = app_fonts[key];
    }
    //Sets API location
    if (document.ping_api_location === undefined) {
      document.ping_api_location = "http://localhost:8000";
    }

    //update pingbursts func
    setInterval(async () => {
      let request_opts = {
        method: "GET",
        mode: "cors",
      };
      let pingburst_res, topology_res;
      try {
        pingburst_res = await fetch(
          new URL("pingbursts", document.ping_api_location),
          request_opts
        );
        topology_res = await fetch(
          new URL("topology", document.ping_api_location),
          request_opts
        );
        if (!pingburst_res.ok || !topology_res.ok) {
          throw Error("[PING MODULE] : Received not ok response");
        }
      } catch (error) {
        console.debug(error);
        return;
      }
      const topology = await topology_res.json();
      const pingbursts = await pingburst_res.json();
      this.setState((state) => {
        return produce(state, (draft) => {
          //find diff of ip_addresses
          function calc_diff_ips(old_topology, new_topology) {
            const old_ips = old_topology.nodes.reduce(
              (ip_set, node) => ip_set.add(node.data.id),
              new Set()
            );
            const difference = [];
            for (const node of new_topology.nodes) {
              const current_ip = node.data.id;
              if (!old_ips.has(current_ip)) {
                difference.push(current_ip);
              }
            }
            return difference;
          }
          const diff_ips = calc_diff_ips(draft.topology, topology);
          //Add new entries to ip_address_info_array
          const diff_ip_address_info_array = diff_ips.map((ip_address) => {
            const nickname = nickname_generator();
            return {
              is_selected: false,
              ip_address,
              nickname,
              is_connected: true,
            };
          });
          draft.ip_address_info_array.push(...diff_ip_address_info_array);
          draft.topology = topology;
          draft.pingbursts = pingbursts;
        });
      });
    }, 1000);
  }

  ip_selection_handler = (ip, is_selected) => {
    this.setState((state) =>
      produce(state, (draft) => {
        const ip_address_info = draft.ip_address_info_array.find(
          (info) => info.ip_address === ip
        );
        ip_address_info.is_selected = is_selected;
      })
    );
  };

  render() {
    return (
      <Scrollbars style={{ height: "100vh", width: "100vw" }}>
        <div className="top_vstack">
          <h1 className="dash_title">Your Wi-SUN Network</h1>
          <div className="pane_container">
            <Pane>
              <div className="tile_container_full tile_container_common">
                <Tile title="Topology">
                  <Topology
                    ip_selection_handler={this.ip_selection_handler}
                    ip_address_info_array={this.state.ip_address_info_array}
                    elements={this.state.topology}
                  />
                </Tile>
              </div>
              <div className="tile_container_full tile_container_common">
                <h2 className="tile_header">IP Addresses</h2>
                <IPAddressTable
                  ip_selection_handler={this.ip_selection_handler}
                  ip_address_info_array={this.state.ip_address_info_array}
                />
              </div>
            </Pane>
            <Pane>
              <div className="tile_container_hstack tile_container_common">
                <div className="tile_container_half">
                  <Tile title="Ping Config">
                    <PingConfig
                      ip_address_info_array={this.state.ip_address_info_array}
                    />
                  </Tile>
                </div>
                <div className="tile_container_half">
                  <Tile title="At A Glance">
                    <AtAGlance {...this.state} />
                  </Tile>
                </div>
              </div>
              <div className="tile_container_full tile_container_common">
                <Monitor {...this.state} />
              </div>
            </Pane>
          </div>
        </div>
      </Scrollbars>
    );
  }
}
