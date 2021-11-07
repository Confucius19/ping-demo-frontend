import "../assets/FlexTable.css";
import CheckBox from "./CheckBox";
import StatusIndicator from "./StatusIndicator";
import FlexTable from "./FlexTable";

// const example_ip_address_info_array = [
//   {
//     ip_address: "aaaa",
//     nickname: "alpha",
//     is_connected: false,
//     is_selected: false,
//   },
//   {
//     ip_address: "bbbb",
//     nickname: "beta",
//     is_connected: true,
//     is_selected: true,
//   },
//   {
//     ip_address: "cccc",
//     nickname: "gamma",
//     is_connected: false,
//     is_selected: true,
//   },
// ];

// function getIPAddressInfoByIPs(ip_addresses) {
//   return ip_addresses.map((ip_address) =>
//     example_ip_address_info_array.find((ele) => ele.ip_address === ip_address)
//   );
// }

function IPAddressRow(props) {
  return props.genRow([
    <CheckBox
      click_handler={(newVal) =>
        props.ip_selection_handler(props.ip_address, newVal)
      }
      is_checked={props.is_selected}
    />,
    props.ip_address,
    props.nickname,
    <StatusIndicator is_good_status={props.is_connected} />,
  ]);
}

export default function IPAddressTable(props) {
  let all_ips_selected = true;
  for (const ip_info of props.ip_address_info_array) {
    if (!ip_info.is_selected) {
      all_ips_selected = false;
      break;
    }
  }

  const toggle_selection_all_ips = (val) => {
    for (const ip_info of props.ip_address_info_array) {
      props.ip_selection_handler(ip_info.ip_address, val);
    }
  };

  const table_format = [
    {
      headerValue: (
        <CheckBox
          is_checked={all_ips_selected}
          click_handler={toggle_selection_all_ips}
        />
      ),
      style: {
        flexBasis: "40px",
        flexGrow: "0",
      },
    },
    {
      headerValue: "IP",
      style: {
        flexGrow: "1",
      },
    },
    {
      headerValue: "Nickname",
      style: {
        flexGrow: "1",
      },
    },
    {
      headerValue: "Status",
      style: {
        flexBasis: "100px",
        flexGrow: "0",
      },
    },
  ];

  const table_rows = props.ip_address_info_array.map((ip_address_info) => {
    return {
      id: ip_address_info.ip_address,
      ip_selection_handler: props.ip_selection_handler,
      ...ip_address_info,
    };
  });
  return (
    <FlexTable
      row_component={IPAddressRow}
      table_format={table_format}
      table_rows={table_rows}
    />
  );
}
