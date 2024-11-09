"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkSpaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkspaceLayout = ({ children }: WorkSpaceIdLayoutProps) => {
    return (
        <div className="h-screen flex flex-col bg-rose-500">
            <Toolbar />
            <div className="flex flex-1 h-[calc(100vh - 40px)]">
                <Sidebar />
                <ResizablePanelGroup direction="horizontal" className="flex-1">
                    <ResizablePanel
                        defaultSize={20}
                        minSize={11}
                        className="bg-rose-600 h-full flex flex-col"
                    >
                        <div className="flex-1">
                            <div className="h-full flex flex-col">
                                
                                <WorkspaceSidebar  />
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className="flex-1">
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default WorkspaceLayout;
