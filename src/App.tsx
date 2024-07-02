import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Save, RotateCcw, TriangleAlert, BadgeCheck } from "lucide-react";
import SkillChecker, {
  SkillCheckerResults,
} from "@/components/stats/SkillChecker";

type SkillCheckState = "Success" | "Failed" | "Standby";

function App() {
  const [skillCheckState, setSkillCheckState] =
    useState<SkillCheckState>("Standby");

  const onRoll = (results: SkillCheckerResults) => {
    console.log(results);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="w-screen h-screen border"
    >
      <ResizablePanel
        defaultSize={25}
        className="flex flex-col h-full items-center justify-center p-6"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Skill check results
        </h3>
        <div className="flex flex-row gap-x-2 my-6">
          <Input
            type="text"
            placeholder="Character name"
            className="max-w-48"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save character</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Alert variant="success" className="max-w-72">
          {skillCheckState == "Success" ? (
            <BadgeCheck className="h-4 w-4" />
          ) : (
            <TriangleAlert className="h-4 w-4" />
          )}
          <AlertTitle>{skillCheckState}</AlertTitle>
          <AlertDescription>
            {skillCheckState == "Standby"
              ? "Roll the dice to check!"
              : `You rolled: ${15}`}
          </AlertDescription>
        </Alert>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={15}
        className="flex flex-col h-full items-center justify-center p-6"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
          Skill check
        </h3>
        <SkillChecker onRoll={onRoll} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={40}
            className="flex h-full justify-center p-6"
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Attributes
            </h3>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={20}
            className="flex h-full justify-center p-6"
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Classes
            </h3>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={40}
            className="flex h-full justify-center p-6"
          >
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Skills
            </h3>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default App;
