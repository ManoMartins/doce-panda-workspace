import { SignIn } from "@features/authentication/components/sign-in";
import { Box } from "@primer/react";
import { Header } from "@components/header";

export default function SignInPage() {
  return (
    <Box>
      <Header />
      <SignIn />
    </Box>
  );
}
