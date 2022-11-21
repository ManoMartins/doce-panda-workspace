import { Sidebar } from "@components/sidebar";
import { PageLayout } from "@primer/react";
import { Header } from "@components/header";
import { ReactNode } from "react";
import { useFlash } from "@contexts/useFlash";

interface LayoutWithSidebarProps {
  children: ReactNode;
}

function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const { flashMemo } = useFlash();
  return (
    <PageLayout containerWidth={"full"} padding={"none"} rowGap={"none"}>
      <PageLayout.Header>
        <Header />
        {flashMemo}
      </PageLayout.Header>

      <PageLayout.Pane position={"start"} padding={"normal"} width={"small"}>
        <Sidebar />
      </PageLayout.Pane>

      <PageLayout.Content
        width={"large"}
        padding={"condensed"}
        sx={{ overflow: "auto" }}
      >
        {children}
      </PageLayout.Content>
    </PageLayout>
  );
}

export { LayoutWithSidebar };
