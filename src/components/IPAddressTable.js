import React from "react";
import ColorScheme from "../ColorScheme";
import "../assets/FlexTable.css";
import { Scrollbars } from "react-custom-scrollbars";
import CheckBox from "./CheckBox";
import StatusIndicator from "./StatusIndicator";

const row_height = 45;
const divider_height = 2;

const example_ip_address_info_array = [
  {
    ip_address: "aaaa",
    nickname: "alpha",
    is_connected: false,
  },
  {
    ip_address: "bbbb",
    nickname: "beta",
    is_connected: true,
  },
  {
    ip_address: "cccc",
    nickname: "gamma",
    is_connected: false,
  },
];

function getIPAddressInfoByIPs(ip_addresses) {
  return ip_addresses.map((ip_address) =>
    example_ip_address_info_array.find((ele) => ele.ip_address === ip_address)
  );
}

class IPAddressRow extends React.Component {
  render() {
    return this.props.genRow([
      <CheckBox is_checked={true} />,
      this.props.ip_address,
      this.props.nickname,
      <StatusIndicator is_good_status={this.props.is_connected} />,
    ]);
  }
}

export default class IPAddressTable extends React.Component {
  constructor(props) {
    super(props);

    this.table_format = [
      {
        headerValue: <CheckBox />,
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

    this.table_headers = this.table_format.map((col_format) => {
      return (
        <div
          key={Math.floor(Math.random() * 1000)}
          className="flex_table_datum"
          style={col_format.style}
        >
          {col_format.headerValue}
        </div>
      );
    });
  }
  render() {
    const bg3 = ColorScheme.get_color("bg3");
    const bg1 = ColorScheme.get_color("bg1");
    const main_table_style = {
      backgroundColor: ColorScheme.get_color("bg2"),
      height: 8 * (row_height + divider_height) + row_height,
    };

    const generateBodyRow = (elements) => {
      console.assert(elements.length === this.table_format.length);
      const wrapped_elems = elements.map((ele, index) => {
        let bodyRowStyle = this.table_format[index].style;
        return (
          <div className="flex_table_datum" style={bodyRowStyle} key={index}>
            {ele}
          </div>
        );
      });
      const body_row_style = {
        borderBottom: `${divider_height}px solid ${bg1}`,
        height: row_height,
      };
      return (
        <div style={body_row_style} className="flex_table_row">
          {wrapped_elems}
        </div>
      );
    };

    const ip_address_info_array = getIPAddressInfoByIPs([
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "aaaa",
      "bbbb",
      "cccc",
    ]);
    const table_rows = ip_address_info_array.map((ip_address_info) => {
      return (
        <IPAddressRow
          key={ip_address_info.ip_address}
          {...ip_address_info}
          genRow={generateBodyRow}
        />
      );
    });
    const scrollbar_style = {
      width: "100%",
      height: 8 * (row_height + divider_height),
    };
    return (
      <div style={main_table_style} className="flex_table">
        <div
          style={{ backgroundColor: bg3, height: row_height }}
          className="flex_table_row flex_table_header_row"
        >
          {this.table_headers}
        </div>
        <Scrollbars style={scrollbar_style}>
          <div className="flex_table_body">{table_rows}</div>
        </Scrollbars>
      </div>
    );
  }
}
