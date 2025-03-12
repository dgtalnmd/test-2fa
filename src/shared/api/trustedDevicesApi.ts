import { api } from ".";
import { TrustedDevice } from "@/shared/types";
import { getToken } from "@/shared/utils";

type TrustedDevicesRequest = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  direction: "DESC" | "ASC";
};

type TrustedDevicesResponse = {
  content: TrustedDevice[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
};

export const trustedDevicesApi = api
  .enhanceEndpoints({ addTagTypes: ["Devices"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTrustedDevices: builder.query<
        TrustedDevicesResponse,
        TrustedDevicesRequest
      >({
        query: (params) => ({
          url: "/trusted-devices",
          params,
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        providesTags: ["Devices"],
      }),
      deleteTrustedDevice: builder.mutation<void, number>({
        query: (id) => ({
          url: `/trusted-devices/${id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        invalidatesTags: ["Devices"],
      }),
    }),
  });

export const { useLazyGetTrustedDevicesQuery, useDeleteTrustedDeviceMutation } =
  trustedDevicesApi;
