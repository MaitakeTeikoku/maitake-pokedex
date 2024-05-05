import { styled } from '@mui/material/styles';
import {
  toggleButtonGroupClasses,
  Paper,
  ToggleButtonGroup, ToggleButton, Divider
} from "@mui/material";
import {
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import { imageList } from "../utils/Config";

type ImageToggleButtonProps = {
  imageNumber: number;
  setImageNumber: React.Dispatch<React.SetStateAction<number>>;
  isShiny: boolean;
  setIsShiny: React.Dispatch<React.SetStateAction<boolean>>;
}

function ImageToggleButton({
  imageNumber,
  setImageNumber,
  isShiny,
  setIsShiny
}: ImageToggleButtonProps): JSX.Element {
  const handleImageNumber = (
    event: React.MouseEvent<HTMLElement>,
    newImageNumber: number | null,
  ) => {
    if (newImageNumber !== null) {
      setImageNumber(newImageNumber);
    }
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
  }));

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
      }}
    >
      <StyledToggleButtonGroup
        value={imageNumber}
        exclusive
        onChange={handleImageNumber}
        size="small"
        color="primary"
      >
        {imageList.map((image, index) => (
          <ToggleButton
            key={index}
            value={index}
            disabled={index === imageNumber}
          >
            {image.icon}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      <StyledToggleButtonGroup
        exclusive
        size="small"
        color="secondary"
      >
        <ToggleButton
          value="check"
          selected={isShiny}
          onChange={() => setIsShiny(!isShiny)}
        >
          <AutoAwesomeIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default ImageToggleButton;
