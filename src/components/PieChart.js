import React from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends React.Component {
  render() {
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    var pingbursts = this.props.pingbursts;

    var ping_reslts_map = new Map(); //has the ip's and the average success rate as the value

    pingbursts.map((id) => {
      var value =
        average(
          id["records"].map((records) => (records["was_success"] ? 1 : 0))
        ) * 100; //get the average of the current ping id

      ping_reslts_map.set(
        id["records"][0]["dest_ip"],
        ping_reslts_map.has(id["records"][0]["dest_ip"])
          ? (ping_reslts_map.get(id["records"][0]["dest_ip"]) + value) / 2
          : value
      );
    });

    var category_map = new Map();
    category_map.set("0-30", []);
    category_map.set("30-60", []);
    category_map.set("60-90", []);
    category_map.set("90-100", []);

    for (let ip of ping_reslts_map.keys()) {
      if (ping_reslts_map.get(ip) <= 30) {
        category_map.set("0-30", [...category_map.get("0-30"), ip]);
      } else if (ping_reslts_map.get(ip) <= 60) {
        category_map.set("30-60", [...category_map.get("30-60"), ip]);
      } else if (ping_reslts_map.get(ip) <= 90) {
        category_map.set("60-90", [...category_map.get("60-90"), ip]);
      } else {
        category_map.set("90-100", [...category_map.get("90-100"), ip]);
      }
    }
    console.log([...category_map.values()].map((x) => x.length));
    //pingbursts.map(x => x["records"].map(y => y["was_success"]?1:0))
    //console.log(ip_info_array.map(x => x["ip_address"]));
    // pingbursts.map(x => x["records"][0]["dest_ip"])

    return (
      <div class="row">
        <Pie
          data={{
            labels: [...category_map.keys()],
            datasets: [
              {
                label: "# vs average error rate",
                data: [...category_map.values()].map((x) => x.length),
                backgroundColor: [
                  "rgba(255, 0, 0, 0.6)",
                  "rgba(255, 165, 0, 0.6)",
                  "rgba(255, 230, 0, 0.6)",
                  "rgba(0, 200, 0, 0.6)",
                ],
                borderColor: [
                  "rgba(255, 0, 0, 1)",
                  "rgba(255, 165, 0, 1)",
                  "rgba(255, 230, 0, 1)",
                  "rgba(0, 200, 0, 1)",
                ],
                borderWidth: 2,
              },
            ],
          }}
          height={500}
          width="100%"
          options={{
            maintainAspectRatio: false,

            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>
    );
  }
}
