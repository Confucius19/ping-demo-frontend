import { useContext } from "react";
import { ColorScheme, THEME, ThemeContext } from "../ColorScheme";
import { Scrollbars } from "react-custom-scrollbars";

export default function FlexTable(props) {
  const table_headers = props.table_format.map((col_format) => {
    return (
      <div
        key={col_format.headerValue}
        className="flex_table_datum"
        style={col_format.style}
      >
        {col_format.headerValue}
      </div>
    );
  });
  const theme = useContext(ThemeContext);
  const row_height = 45;
  const divider_height = 2;
  let header_fg_color = null;
  let header_bg_color = null;
  let body_fg_color = null;
  let row_rule_color = null;
  let borderRadius = null;
  let table_box_shadow = null;
  let body_bg_color = ColorScheme.get_color("bg2", theme);
  if (theme === THEME.TI) {
    header_bg_color = ColorScheme.get_color("red", theme);
    header_fg_color = ColorScheme.get_color("white", theme);
    body_fg_color = ColorScheme.get_color("gray", theme);
    row_rule_color = ColorScheme.get_color("gray_light", theme);
    borderRadius = 0;
    table_box_shadow = "0px 1px 14px rgba(0, 0, 0, 0.3)";
  } else {
    header_bg_color = ColorScheme.get_color("bg3", theme);
    header_fg_color = ColorScheme.get_color("white", theme);
    body_fg_color = ColorScheme.get_color("white", theme);
    row_rule_color = ColorScheme.get_color("bg1", theme);
    borderRadius = 9;
  }
  const main_table_style = {
    color: body_fg_color,
    backgroundColor: body_bg_color,
    height: 8 * (row_height + divider_height) + row_height,
    boxShadow: table_box_shadow,
    borderRadius,
  };

  const generateBodyRow = (elements) => {
    console.assert(elements.length === props.table_format.length);
    const wrapped_elems = elements.map((ele, index) => {
      let bodyRowStyle = props.table_format[index].style;
      return (
        <div className="flex_table_datum" style={bodyRowStyle} key={index}>
          {ele}
        </div>
      );
    });
    const body_row_style = {
      borderBottom: `${divider_height}px solid ${row_rule_color}`,
      height: row_height,
    };
    return (
      <div style={body_row_style} className="flex_table_row">
        {wrapped_elems}
      </div>
    );
  };

  const table_row_elements = props.table_rows.map((row) => {
    return (
      <props.row_component
        key={row.id}
        {...row}
        {...props}
        total_row_height={row_height + divider_height}
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
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          color: header_fg_color,
          backgroundColor: header_bg_color,
          height: row_height,
        }}
        className="flex_table_row flex_table_header_row"
      >
        {table_headers}
      </div>
      <Scrollbars style={scrollbar_style}>
        <div className="flex_table_body">{table_row_elements}</div>
      </Scrollbars>
    </div>
  );
}
