import { THEME_CHANGE_REQUEST } from "../actions/theme.js";

const selectedTheme = localStorage.getItem("theme");

export default function theme(
  state = {
    selectedTheme: selectedTheme || "dark",
  },
  action
) {
  switch (action.type) {
    case THEME_CHANGE_REQUEST:
      const newTheme = state.selectedTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return {
        ...state,
        selectedTheme: newTheme,
      };
    default:
      return state;
  }
}
