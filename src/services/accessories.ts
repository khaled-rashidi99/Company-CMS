import { Accessory } from "../types";

export function listAccessories(): Accessory[] {
  return JSON.parse(localStorage.getItem("accessories") ?? "[]").sort(
    (a: Accessory, b: Accessory) => b.id - a.id
  );
}

export function createAccessory(Accessory: Accessory) {
  const accessories = listAccessories();
  accessories.push(Accessory);
  localStorage.setItem("accessories", JSON.stringify(accessories));
}

export const editAccessory = (Accessory: Accessory) => {
  const accessories = listAccessories();
  const index = accessories.findIndex((d) => d.id === Accessory.id);
  accessories[index] = Accessory;
  localStorage.setItem("accessories", JSON.stringify(accessories));
};

export function deleteAccessory(AccessoryId: number) {
  const filterdAccessories = listAccessories().filter(
    (Accessory) => Accessory.id !== AccessoryId
  );
  localStorage.setItem("accessories", JSON.stringify(filterdAccessories));
}

export const deleteDeviceAccessories = (deviceId: number) => {
  const filterdAccessories = listAccessories().filter(
    (Accessory) => Accessory.deviceId !== deviceId
  );
  localStorage.setItem("accessories", JSON.stringify(filterdAccessories));
};

export function generateNewId(): number {
  // Generate a new ID by finding the highest ID and adding 1
  return Math.max(...listAccessories().map((Accessory) => Accessory.id)) + 1;
}
