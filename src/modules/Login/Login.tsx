import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Anchor,
  Button,
  Flex,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useAuthMutation } from "@/shared/api/authenticationApi";
import { setAuthCookie } from "@/shared/utils";
import { AuthRequest, TwoFaRequiredResponse } from "@/shared/types";
import { GenerateQrModal, PinCodeModal } from "./components";

export const Login = (props: PaperProps) => {
  const [auth, { isSuccess, data, isLoading }] = useAuthMutation();

  const [showGenerateQrModal, setShowGenerateQrModal] = useState(false);
  const [showPinCodeModal, setShowPinCodeModal] = useState(false);

  const [twoFaParams, setTwoFaParams] = useState<TwoFaRequiredResponse | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      if (data.statusCode === 202 && "twoFactorSetupRequired" in data) {
        setTwoFaParams(data);
        if (data.twoFactorSetupRequired) {
          setShowGenerateQrModal(true);
        } else {
          setShowPinCodeModal(true);
        }
      } else if (data.statusCode === 200 && "token" in data) {
        setAuthCookie(data);
        navigate("/");
      }
    }
  }, [data, isSuccess, navigate]);

  const form = useForm<AuthRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleCloseGenerateQrModal = () => {
    setShowGenerateQrModal(false);
    setShowPinCodeModal(true);
  };

  return (
    <>
      <Flex h="100%" justify="center" align="center">
        <Paper maw={500} w="100%" radius="md" p="xl" withBorder {...props}>
          <Text ta="center" size="lg" fw={500}>
            Login
          </Text>

          <form onSubmit={form.onSubmit(auth)}>
            <Stack style={{ textAlign: "left" }}>
              <TextInput
                required
                label="Email"
                placeholder="hello@example.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />
            </Stack>

            <Group justify="space-between" mt="xl">
              <Button loading={isLoading} fullWidth type="submit" radius="xl">
                Sign in
              </Button>
            </Group>
          </form>

          <Flex justify="center">
            <Anchor mt="md" component="button" size="sm">
              Forgot password?
            </Anchor>
          </Flex>
        </Paper>
      </Flex>

      {showGenerateQrModal && twoFaParams?.tempToken && (
        <GenerateQrModal
          tempToken={twoFaParams?.tempToken}
          onClose={handleCloseGenerateQrModal}
        />
      )}
      {showPinCodeModal && twoFaParams && (
        <PinCodeModal
          twoFaParams={twoFaParams}
          onClose={() => setShowPinCodeModal(false)}
        />
      )}
    </>
  );
};
