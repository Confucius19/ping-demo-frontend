import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'



export default class BarChart extends React.Component {


  render() {
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    
    var pingbursts = this.props.pingbursts;
    
    var reslts_map = new Map()//has the ip's and the average success rate as the value

    pingbursts.map( (x) => {
      var value = average(x["records"].map(records => records["was_success"] ? 1 : 0))*100//get the average of the current ping id
      
      reslts_map.set( x["records"][0]["dest_ip"], reslts_map.has(x["records"][0]["dest_ip"])?(reslts_map.get( x["records"][0]["dest_ip"])+value)/2:value)
    })
    
    //console.log([...reslts_map.keys()])
    //pingbursts.map(x => x["records"].map(y => y["was_success"]?1:0))
    //console.log(ip_info_array.map(x => x["ip_address"]));
    // pingbursts.map(x => x["records"][0]["dest_ip"])

    return (
      <div>
        <Bar
          data={{
            labels: [...reslts_map.keys()],
            datasets: [
              {
                label: 'average success rate',
                data: [...reslts_map.values()],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',

                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
              },

            ],
          }}
          height={500}
          width="100%"
          options={{
            maintainAspectRatio: false,
            scales:{
              y:{
                max: 100,
                beginAtZero: true,
              }
            },

            legend: {
              labels: {
                fontSize: 25,
              },
            },

            
          }}
        />
      </div>
    )
  }
}