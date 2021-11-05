import gruvbox_color_theme from "./gruvbox.js";

const ColorScheme = {
  color_map: gruvbox_color_theme,
  get_color: function (name) {
    return this.color_map[name];
  },
  get_color_with_opacity: function (color, opacity) {
    //opacity [0,1]
    let hexcolor = this.get_color(color);
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  },
};

export default ColorScheme;
