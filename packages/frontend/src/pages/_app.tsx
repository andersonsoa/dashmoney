import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";
import { ModalProvider } from "../contexts/ModalContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
