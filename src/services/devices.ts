import { Device } from "../types";
import { deleteDeviceAccessories } from "./accessories";
import { deleteDeviceOffer } from "./offers";

export function listDevices(): Device[] {
  return JSON.parse(localStorage.getItem("devices") ?? "[]").sort(
    (a: Device, b: Device) => b.id - a.id
  );
}

export function createDevice(device: Device) {
  const devices = listDevices();
  devices.push(device);
  localStorage.setItem("devices", JSON.stringify(devices));
}

export const editDevice = (device: Device) => {
  const devices = listDevices();
  const index = devices.findIndex((d) => d.id === device.id);
  devices[index] = device;
  localStorage.setItem("devices", JSON.stringify(devices));
};

export function deleteDevice(deviceId: number) {
  const filterdDevices = listDevices().filter(
    (device) => device.id !== deviceId
  );
  localStorage.setItem("devices", JSON.stringify(filterdDevices));
  deleteDeviceAccessories(deviceId);
  deleteDeviceOffer(deviceId);
}

export function generateNewId(): number {
  // Generate a new ID by finding the highest ID and adding 1
  return Math.max(...listDevices().map((device) => device.id)) + 1;
}
