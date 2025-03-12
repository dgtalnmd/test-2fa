import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Flex, Modal, PinInput } from "@mantine/core";

import { useSetUpMutation, useVerifyMutation } from "@/shared/api/twoFaApi";
import { TwoFaRequiredResponse } from "@/shared/types";
import { setAuthCookie } from "@/shared/utils";

export const PinCodeModal: FC<{
  onClose: () => void;
  twoFaParams: TwoFaRequiredResponse;
}> = ({ onClose, twoFaParams }) => {
  const [code, setCode] = useState("");

  const pinInputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (code) {
      btnRef.current?.focus();
    }
  }, [code]);

  useEffect(() => {
    // without timeout autofocus does not work
    setTimeout(() => pinInputRef.current?.focus(), 100);
  }, []);

  const navigate = useNavigate();

  const [
    setUpTwoFa,
    { data: dataSetUp, isLoading: isSetUpLoading, isSuccess: isSetUpSuccess },
  ] = useSetUpMutation();

  const [
    verify,
    {
      data: dataVerify,
      isLoading: isVerifyLoading,
      isSuccess: isVerifySuccess,
    },
  ] = useVerifyMutation();

  useEffect(() => {
    if (isSetUpSuccess || isVerifySuccess) {
      const data = dataSetUp || dataVerify;
      setAuthCookie(data!);

      navigate("/");
    }
  }, [dataSetUp, dataVerify, isSetUpSuccess, isVerifySuccess, navigate]);

  const handleComplete = (value: string) => {
    setCode(value);
  };

  const handleSend = () => {
    const params = { tempToken: twoFaParams.tempToken, totpCode: code };

    if (twoFaParams.twoFactorSetupRequired) {
      setUpTwoFa(params);
    } else {
      verify(params);
    }
  };

  const isLoading = isSetUpLoading || isVerifyLoading;

  return (
    <Modal opened onClose={onClose} title="PIN code">
      <Flex justify="center">
        <PinInput
          size="lg"
          onComplete={handleComplete}
          length={6}
          inputMode="numeric"
          ref={pinInputRef}
        />
      </Flex>

      <Button
        ref={btnRef}
        disabled={!code}
        mt={20}
        onClick={handleSend}
        fullWidth
        loading={isLoading}
      >
        Send
      </Button>
    </Modal>
  );
};
