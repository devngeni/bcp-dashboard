import { SelectItems } from "@/styles/common.styles";
import { MenuItem } from "@mui/material";

export interface HandleSelectCategoryProps {
  selectItem: string;
  setSelectItem: any;
  menuItemPlaceholder?: string;
  selectDataItems: string[];
}

export const HandleSelectCategory = ({
  selectItem,
  setSelectItem,
  menuItemPlaceholder,
  selectDataItems,
}: HandleSelectCategoryProps) => {
  const handleItemSelect = (event: { target: { value: any } }) => {
    setSelectItem(event.target.value);
  };
  return (
    <>
      <SelectItems
        value={selectItem}
        onChange={(e) => setSelectItem(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          {menuItemPlaceholder}
        </MenuItem>
        {selectDataItems?.map((item: any, index: any) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </SelectItems>
    </>
  );
};
