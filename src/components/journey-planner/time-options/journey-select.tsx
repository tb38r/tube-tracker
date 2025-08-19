import {
    FormControl,
    MenuItem,
    Select,
    type SelectChangeEvent,
  } from "@mui/material";
  import { selectStyles} from "./helpers";
  import "./styles/time.css";
  
  
  interface TimeSelectProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    id: string;
    label: string;
    options: Option;
    sx?: object;
    [key: string]: any; 
  }
  
  type Option = string[];
  
  const JourneySelect = ({ value, onChange, id, label, options, sx, ...props }: TimeSelectProps) => {
    const commonProps = {
      disableUnderline: true,
      IconComponent: () => null,
      labelId: `select-${id}`,
      id: `select-${id}`,
      label: label,
      MenuProps: {
        anchorOrigin: {
          vertical: "top" as const,
          horizontal: "center" as const,
        },
      },
      sx: sx,
      value,
      onChange,
      ...props
    };
  
    return (
      <FormControl variant="standard">
        <Select {...commonProps}>
          {options.map((option) => (
            <MenuItem key={option} sx={selectStyles} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  export {JourneySelect}