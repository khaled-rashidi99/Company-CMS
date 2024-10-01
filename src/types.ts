export interface Device {
  id: number;
  name: string;
  manufactureDate: string;
  image: string;
  ramSizeGB: number;
  storageSizeGB: number;
}

export interface Accessory {
  id: number;
  name: string;
  image: string;
  deviceId: number;
}

export interface Offer {
  price: number;
  endDate: string;
  deviceId: number;
  accessories: number[];
}

export type ThemeMode = "light" | "dark";
