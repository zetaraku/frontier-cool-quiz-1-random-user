// Tabs

export const availableTabs = [
  { key: 'all', name: 'ALL' },
  { key: 'male', name: 'Male' },
  { key: 'female', name: 'Female' },
  { key: 'favorite', name: 'Favorite' },
] as const;

export type TabKey = typeof availableTabs[number]["key"];

export const defaultTab: TabKey = 'all';

// Page Sizes

export const availablePageSizes = [
  { key: 10, name: '10' },
  { key: 30, name: '30' },
  { key: 50, name: '50' },
] as const;

export type PageSizeKey = typeof availablePageSizes[number]["key"];

export const defaultPageSize: PageSizeKey = 30;

// Display Modes

export const availableDisplayModes = [
  { key: 'card', icon: 'mdi:view-comfy' },
  { key: 'list', icon: 'mdi:view-sequential' },
] as const;

export type DisplayModeKey = typeof availableDisplayModes[number]["key"];

export const defaultDisplayMode: DisplayModeKey = 'card';
