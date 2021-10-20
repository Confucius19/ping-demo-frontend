// import logo from './logo.svg';
import React from "react";
import "./App.css";
import PingConfiguration from "./components/ping_config";
import PingLog from "./components/ping_log";
import MagnitudeIndicator from "./components/magnitude_indicator";

const dummy_pingbursts = [
  {
    id: 53,
    num_packets_requested: 10,
    records: [
      {
        source: "2020::A",
        destination: "2020::C",
        start: "Tue Aug 19 1975 23:15:30 GMT+0200",
        duration: 234,
        packet_size: 56,
        was_success: true,
      },
    ],
  },
  {
    id: 57,
    num_packets_requested: 10,
    records: [
      {
        source: "2020::B",
        destination: "2020::C",
        start: "Tue Aug 19 1975 23:15:30 GMT+0200",
        duration: 234,
        packet_size: 56,
        was_success: true,
      },
    ],
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pingbursts: [],
    };

    setInterval(async () => {
      let request_opts = {
        method: "GET",
        mode: "cors",
      };
      const res = await fetch("pingbursts", request_opts);
      // const body = JSON.parse(res.body);
      const pingbursts = await res.json();
      this.setState({ pingbursts });
      console.log(pingbursts);
    }, 5000);
  }

  render() {
    const right_pane_style = {
      backgroundColor: "var(--bg1)",
      width: 660,
      marginRight: 35,
      marginTop: 100,
      marginLeft: "auto",
    };
    return (
      <div style={right_pane_style}>
        <PingConfiguration />
        <PingLog pingbursts={this.state.pingbursts} />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
