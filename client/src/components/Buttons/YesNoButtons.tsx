import { Button } from "@mui/material";
import * as styles from "./YesNoButtons.styles";

type YesNoButtonsProps = {
  primaryText?: string;
  secondaryText?: string;
  primaryDisabled?: boolean;
  primaryOnClick: () => void;
  secondaryOnClick: () => void;
};

export const YesNoButtons = ({
  primaryText,
  secondaryText,
  primaryDisabled,
  primaryOnClick,
  secondaryOnClick,
}: YesNoButtonsProps) => {
  return (
    <div style={styles.buttonStyles}>
      <Button
        disabled={primaryDisabled}
        style={styles.button}
        variant="contained"
        onClick={primaryOnClick}
      >
        {primaryText ? primaryText : "Yes"}
      </Button>
      <Button
        style={styles.button}
        variant="outlined"
        onClick={secondaryOnClick}
      >
        {secondaryText ? secondaryText : "No"}
      </Button>
    </div>
  );
};
