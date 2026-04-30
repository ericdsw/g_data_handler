import { IconButton, Tooltip } from "@mui/material";
import { Help } from "@mui/icons-material";

import { useDialogueManager } from "@/hooks";
import { GenericDialogue } from "@/components/elements";
import HelpContent from "./HelpContent";

const HelpButton = () => {
  const [dialogues, toggleDialogue] = useDialogueManager('helpDialogue')
  
  const iconButtonClick = () => toggleDialogue('helpDialogue', 'show');
  const closeDialogue = () => toggleDialogue('helpDialogue', 'hide');

  return (
    <>
      <Tooltip title="Help">
        <IconButton
          size="large"
          color="inherith"
          onClick={iconButtonClick}
        >
          <Help />
        </IconButton>
      </Tooltip>
      <GenericDialogue
        open={dialogues['helpDialogue']}
        onClose={closeDialogue}
        maxWidth="sm"
      >
        <HelpContent />
      </GenericDialogue>
    </>
  );
}

export default HelpButton;
