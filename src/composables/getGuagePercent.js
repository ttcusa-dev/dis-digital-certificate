// composables/usePercentages.js
import { reactive } from 'vue';

export function usePercentages() {
  const percentages = reactive({
    IF: 0.3,
    I1: 0.07,
    I2: 0.14,
    I3: 0.21,
    SI: 0.28,
    SI1: 0.35,
    SI2: 0.42,
    SI3: 0.49,
    VS: 0.56,
    VS2: 0.63,
    VS1: 0.70,
    VVS2: 0.77,
    VVS1: 0.84,
    INFLAWLESS: 0.91,
    FLAWLESS: 1,
    Poor: 0.17,
    Fair: 0.37,
    Good: 0.6,
    "Very Good": 0.8,
    Excellent: 1,
    "Very Strong": 1,
    Strong: 0.8,
    Medium: 0.6,
    Faint: 0.4,
    None: 1,
  });

  return { percentages };
}
