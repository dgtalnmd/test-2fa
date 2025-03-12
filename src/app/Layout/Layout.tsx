import { FC, PropsWithChildren } from "react";
import { AppShell, AppShellMain, Container } from "@mantine/core";
import { Header } from "./components/Header/Header";
import classes from "./Layout.module.css";
import { useLocation } from "react-router";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <AppShell>
      <AppShellMain>
        {!isLogin && <Header />}
        <Container
          className={!isLogin ? classes.container : undefined}
          h="100dvh"
        >
          {children}
        </Container>
      </AppShellMain>
    </AppShell>
  );
};
