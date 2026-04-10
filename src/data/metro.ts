import { MetroRoutes } from '../types';

export const metroRoutes: MetroRoutes = {
  "Rajiv Chowk": { "line": "Yellow Line", "platform": "2", "direction": "HUDA City Centre" },
  "Central Secretariat": { "line": "Yellow Line", "platform": "2", "direction": "HUDA City Centre" },
  "Udyog Bhawan": { "line": "Yellow Line", "platform": "2", "direction": "HUDA City Centre" },
  "Lok Kalyan Marg": { "line": "Yellow Line", "platform": "2", "direction": "HUDA City Centre" },
  "Noida Sector 15": { "line": "Blue Line", "platform": "1", "direction": "Dwarka" },
  "Noida Sector 16": { "line": "Blue Line", "platform": "1", "direction": "Dwarka" },
  "Noida Sector 18": { "line": "Blue Line", "platform": "1", "direction": "Dwarka" },
  "Botanical Garden": { "line": "Blue Line", "platform": "2", "direction": "Noida Electronic City" },
  "Sector 51": { "line": "Aqua Line", "platform": "1", "direction": "Depot" },
  "Sector 52": { "line": "Aqua Line", "platform": "1", "direction": "Depot" },
  "Noida Sector 76": { "line": "Aqua Line", "platform": "1", "direction": "Depot" },
};

export const stations = Object.keys(metroRoutes);
