import { FC, useEffect } from "react";
import { Button, Flex, Loader, Modal } from "@mantine/core";
import QRCode from "react-qr-code";

import { useGenerateQrCodeMutation } from "@/shared/api/twoFaApi";

export const GenerateQrModal: FC<{
  onClose: () => void;
  tempToken: string;
}> = ({ onClose, tempToken }) => {
  const [generateQr, { data, isLoading }] = useGenerateQrCodeMutation();

  useEffect(() => {
    generateQr(tempToken);
  }, [generateQr, tempToken]);

  return (
    <Modal opened onClose={onClose} title="Scan QR Code">
      {isLoading && (
        <Flex mih={312} justify="center" align="center">
          <Loader />
        </Flex>
      )}
      {data?.totpQrCodeUrl && (
        <>
          <Flex justify="center">
            <QRCode value={data.totpQrCodeUrl} />
          </Flex>

          <Button mt={20} onClick={onClose} fullWidth>
            Done
          </Button>
        </>
      )}
    </Modal>
  );
};
