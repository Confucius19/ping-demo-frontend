import gruvbox_color_theme from "./gruvbox.js";

const ColorScheme = {
  color_map: gruvbox_color_theme,
  get_color: function (name) {
    return this.color_map[name];
  },
};

export default ColorScheme;
