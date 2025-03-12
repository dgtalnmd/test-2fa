import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import {
  ActionIcon,
  Alert,
  Flex,
  Pagination,
  Table,
  Title,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

import {
  trustedDevicesApi,
  useDeleteTrustedDeviceMutation,
  useLazyGetTrustedDevicesQuery,
} from "@/shared/api/trustedDevicesApi";
import { PageLoader } from "@/shared/components";
import classes from "./TrustedDevices.module.css";

const ITEMS_PER_PAGE = 20;

export const TrustedDevices = () => {
  const [getDevices, { data, isFetching, isError, isLoading }] =
    useLazyGetTrustedDevicesQuery();

  const [deleteDevice, { isSuccess: isDeleteSuccess }] =
    useDeleteTrustedDeviceMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      notifications.show({
        message: "The trusted device has been successfully deleted.",
        color: "green",
      });
      trustedDevicesApi.util.invalidateTags(["Devices"]);
    }
  }, [isDeleteSuccess]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getDevices({
      pageNumber: page,
      pageSize: ITEMS_PER_PAGE,
      sortBy: "ID",
      direction: "DESC",
    });
  }, [getDevices, page]);

  const isDeleteLoading = false;
  const [deletingId, setDeletingId] = useState<null | number>(null);
  const confirmDelete = (id: number) => {
    setDeletingId(id);
    modals.openConfirmModal({
      title: "Confirm deletion",
      children: `Are you sure you want to delete trusted device information?`,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => deleteDevice(id),
    });
  };

  if (isError) {
    return <Alert color="red">Error loading trusted devices</Alert>;
  }
  if (!data || isLoading) return <PageLoader />;

  const rows = data?.content.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{new Date(row.createdAt).toLocaleString()}</Table.Td>
      <Table.Td>{row.fingerprint}</Table.Td>
      <Table.Td className={classes.actionsColumn}>
        <Tooltip label="Delete">
          <ActionIcon
            onClick={() => confirmDelete(row.id)}
            variant="transparent"
            title="Delete"
            disabled={isDeleteLoading}
            loading={isDeleteLoading && deletingId === row.id}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title mb={15} p="0 10px" order={3}>
        List of Trusted Devices
      </Title>
      {!data?.content.length ? (
        <Alert>No Trusted Devices</Alert>
      ) : (
        <>
          {isFetching && <PageLoader />}

          <Table miw={700}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Fingerprint</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Flex justify="center" pb="xs">
            <Pagination
              mt="lg"
              total={data.page.totalPages}
              value={page}
              onChange={setPage}
              hideWithOnePage
            />
          </Flex>
        </>
      )}
    </>
  );
};
