import { reactive } from "vue";

export function getColorAttribute() {
  const percentages = reactive({
    Standard: {
      D: 1.0,
      E: 0.88,
      F: 0.84,
      G: 0.8,
      H: 0.76,
      I: 0.72,
      J: 0.68,
      K: 0.64,
      L: 0.6,
      M: 0.56,
      N: 0.52,
      O: 0.48,
      P: 0.44,
      Q: 0.4,
      R: 0.36,
      S: 0.32,
      T: 0.28,
      U: 0.24,
      V: 0.2,
      W: 0.16,
      X: 0.12,
      Y: 0.08,
      Z: 0.04,
      Black: 1,
    },

    Blue: {
      Light: 1.0,
      "Fancy Light": 0.8,
      Fancy: 0.6,
      "Fancy Intense": 0.4,
      "Fancy Vivid": 0.2,
    },

    Brown: {
      C1: 0.125,
      C2: 0.25,
      C3: 0.375,
      C4: 0.5,
      C5: 0.625,
      C6: 0.75,
      C7: 0.875,
      C8: 1.0,
    },

    Green: {
      Faint: 0.125,
      "Very Light": 0.25,
      Light: 0.375,
      "Fancy Light": 0.5,
      Fancy: 0.625,
      "Fancy Intense": 0.75,
      "Fancy Vivid": 0.875,
      "Fancy Deep": 1.0,
    },

    Pink: {
      Faint: 0.125,
      "Very Light": 0.25,
      Light: 0.375,
      "Fancy Light": 0.5,
      Fancy: 0.625,
      "Fancy Intense": 0.75,
      "Fancy Vivid": 0.875,
      "Fancy Deep": 1.0,
    },

    Yellow: {
      "Fancy Light": 0.2,
      Fancy: 0.4,
      Intense: 0.6,
      Vivid: 0.8,
      Deep: 1.0,
    },

    Black: {
      A: 0.25,
      AA: 0.5,
      AAA: 0.75,
      AAAA: 1.0,
    },

    Red: {
      Faint: 0.125,
      Fancy: 0.25,
      "Fancy Dark": 0.375,
      "Fancy Intense": 0.5,
      "Fancy Light": 0.625,
      "Fancy Vivid": 0.75,
      Light: 0.875,
      "Very Light": 1.0,
    },
  });

  const barColor = {
    Standard: "#287bc9",
    Black: "#3f3f40",
    Blue: "#2f2fb7",
    Brown: "#845e5e",
    Green: "#0fb30f",
    Pink: "#f25771",
    Yellow: "#ffff02",
    Orange: "#ffa807",
    Purple: "#9f059f",
    Red: "#ff0707",
  };

  return { percentages, barColor };
}
