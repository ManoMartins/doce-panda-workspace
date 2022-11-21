import { ThemeProvider } from "@primer/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GlobalStyle from "./styles/global-styles";

import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { Suspense } from "react";
import { FlashProvider } from "@contexts/useFlash";
import { AuthContextProvider } from "@features/authentication/contexts/use-auth";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider>
          <FlashProvider>
            <GlobalStyle />

            <Suspense fallback={<p>Loading...</p>}>
              <div className="App">{useRoutes(routes)}</div>
            </Suspense>
          </FlashProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
