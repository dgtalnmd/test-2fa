import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

import { isFetchBaseQueryError } from "@/shared/utils";
import { clearAuthCookie } from "@/shared/utils/auth";
import { ROUTE_LOGIN } from "@/shared/const/routes";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (isFetchBaseQueryError(action.payload)) {
      if (action.payload.status === 401) {
        if (window.location.pathname !== ROUTE_LOGIN) {
          clearAuthCookie();
          window.location.pathname = ROUTE_LOGIN;
          return;
        }

        notifications.show({
          message: "Authorization error. Please provide valid credentials.",
          color: "red",
        });
      } else {
        notifications.show({
          message:
            "An error occurred while requesting the server, please try again later.",
          color: "red",
        });
      }
    }
  }

  return next(action);
};
