import { Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Login, TrustedDevices } from "@/modules";
import { ROUTE_LOGIN } from "@/shared/const";

import { Layout } from "./Layout";

export const App = () => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<TrustedDevices />} />
            <Route path={ROUTE_LOGIN} element={<Login />} />
          </Routes>
        </Layout>
        <Notifications />
      </ModalsProvider>
    </MantineProvider>
  );
};
