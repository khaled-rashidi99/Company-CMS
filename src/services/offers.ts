import { Offer } from "../types";

export function listOffers(): Offer[] {
  return JSON.parse(localStorage.getItem("offers") ?? "[]");
}

export function getDeviceOffer(deviceId: number) {
  const offers: Offer[] = JSON.parse(localStorage.getItem("offers") ?? "[]");
  const deviceOffers = offers.filter((offer) => offer.deviceId === deviceId);
  return deviceOffers.length === 0 ? null : deviceOffers[0];
}

export function createOffer(offer: Offer) {
  const offers = listOffers();
  offers.push(offer);
  localStorage.setItem("offers", JSON.stringify(offers));
}

export function editOffer(offer: Offer) {
  const offers = listOffers();
  const offerIndex = offers.findIndex((o) => o.deviceId === offer.deviceId);
  offers[offerIndex] = offer;
  localStorage.setItem("offers", JSON.stringify(offers));
}

export const deleteDeviceOffer = (deviceId: number) => {
  const filterdOffers = listOffers().filter(
    (Offer) => Offer.deviceId !== deviceId
  );
  localStorage.setItem("offers", JSON.stringify(filterdOffers));
};
