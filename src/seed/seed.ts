import { Accessory, Device } from "../types";
import data from "./data.json";

export function seedData() {
  const seedDevices: Device[] = [];
  const accessories: Accessory[] = [];

  let accessoryId = 0;

  data.mobile.forEach((device) => {
    seedDevices.push({
      id: device.id,
      name: `${device.brand} ${device.model}`,
      manufactureDate: device.announced,
      image: device.img_url,
      ramSizeGB: parseFloat(device.RAM.split(" ")[0]),
      storageSizeGB: parseFloat(device.internal_memory.split("/")[0]),
    });

    const randomNumber = Math.random();

    // 1/3 chance of getting 1 accessory, 1/3 chance of getting 2 accessories
    // and 1/3 chance of getting no accessories

    if (randomNumber < 1 / 3) {
      accessories.push({
        id: accessoryId++,
        name: data.accessories[0].name,
        image: data.accessories[0].image,
        deviceId: device.id,
      });
    } else if (randomNumber < 2 / 3) {
      accessories.push(
        {
          id: accessoryId++,
          name: data.accessories[0].name,
          image: data.accessories[0].image,
          deviceId: device.id,
        },
        {
          id: accessoryId++,
          name: data.accessories[1].name,
          image: data.accessories[1].image,
          deviceId: device.id,
        }
      );
    } else {
    }
  });

  localStorage.setItem("devices", JSON.stringify(seedDevices));
  localStorage.setItem("accessories", JSON.stringify(accessories));
  console.log("Seed data is stored in local storage successfully");
  window.location.reload();
}
