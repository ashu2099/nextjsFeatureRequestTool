import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

export default function FeatureRequestUpdateDialogue({
  isOpen,
  interactionCallback,
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feature Request Added !</DialogTitle>
          <DialogDescription>
            Your request has successfully been added to the list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="default"
            size="default"
            onClick={() => {
              interactionCallback(true);
            }}
          >
            Go Back
          </Button>

          <Button
            variant="secondary"
            size="default"
            onClick={() => {
              interactionCallback(false);
            }}
          >
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
