# iCompany CMS Application

This React application is designed to manage mobile devices, their accessories, and offers. It provides a user-friendly interface to perform (Create, Read, Update, Delete) operations on devices and their accessories, as well as manage special offers for selected devices.

## Features

- **React**: Utilizes the latest React features for efficient updating and rendering of components.

- **Material-UI (MUI)**: Implements Material-UI for a polished, responsive design.

- **React Router**: Leverages React Router for seamless navigation between different pages and views within the app.

- **Local Storage**: Uses local storage to persistently store data for cart functionality and pass other global data between pages.

- **Seed Data**

- Automatically populates the app with sample transaction data on first start
- Provides users with an immediate understanding of app functionality
- Sample data includes a mix of income and expense transactions

- **Theme Mode**

- Toggle between light and dark modes for comfortable viewing in different lighting conditions
- Persistent theme preference saved across sessions
- Automatic adaptation of all UI components and charts to the selected theme

- **Responsive Design**: Adapts gracefully to different screen sizes and devices.

## Pages and Functionalities

### Devices

In this page, you can manage the mobile devices:

- Display a list of devices in a table.
- Create a new device.
- Update an existing device.
- Delete a device.

### Accessories

In this page, you can manage accessories for the devices:

- A dropdown select to pick a device.
- On selecting a device, a table of its accessories is displayed.
- Create a new accessory.
- Update an existing accessory.
- Delete an accessory.

### Offers

In this page, you can manage offers for devices:

- A dropdown select to pick a device.
- On selecting a device, if there is an existing offer, it is displayed with the ability to modify it.
- If there is no offer, a message "No offer on this device" is shown along with a button to create the offer.

© Copyright 2024. Made with ❤️
