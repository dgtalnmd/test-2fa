import { Button, Container } from "@mantine/core";
import classes from "./Header.module.css";
import { clearAuthCookie } from "@/shared/utils/auth";

import { ROUTE_LOGIN } from "@/shared/const";

export const Header = () => {
  const handleLogout = () => {
    clearAuthCookie();
    window.location.pathname = ROUTE_LOGIN;
  };

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </Container>
    </header>
  );
};
