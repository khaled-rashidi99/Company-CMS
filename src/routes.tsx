import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import DevicesPage from "./components/pages/DevicesPage";
import AccessoriesPage from "./components/pages/AccessoriesPage";
import OffersPage from "./components/pages/OffersPage";
import Layout from "./components/Layout";
import ProfilePage from "./components/pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout title="Dashboard">
          <HomePage />
        </Layout>
      </>
    ),
  },
  {
    path: "/devices",
    element: (
      <Layout title="Devices Page">
        <DevicesPage />
      </Layout>
    ),
  },
  {
    path: "/accessories",
    element: (
      <Layout title="Accessories Page">
        <AccessoriesPage />
      </Layout>
    ),
  },
  {
    path: "/offers",
    element: (
      <>
        <Layout title="Offers Page">
          <OffersPage />
        </Layout>
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Layout title="Profile Page">
          <ProfilePage />
        </Layout>
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Layout title="Page Not Found">
          <NotFoundPage />
        </Layout>
      </>
    ),
  },
]);
