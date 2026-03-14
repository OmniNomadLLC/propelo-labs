import type { ReactNode } from "react";
import { ProjectProvider } from "./project-context";
import { WorkspaceFrame } from "./workspace-frame";

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProjectProvider>
      <WorkspaceFrame>{children}</WorkspaceFrame>
    </ProjectProvider>
  );
}
