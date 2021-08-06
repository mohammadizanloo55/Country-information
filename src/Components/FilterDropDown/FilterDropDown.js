import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { memo } from "react";

const FilterDropDown = ({ Options, Title, OnChange }) => (
  <Menu closeOnSelect={true}>
    <MenuButton as={Button} colorScheme="blue">
      {Title}
    </MenuButton>
    <MenuList minWidth="240px">
      <MenuOptionGroup onChange={OnChange} type="radio">
        {Options.map((Value) => (
          <MenuItemOption key={Value} value={Value}>
            {Value}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </MenuList>
  </Menu>
);
export default memo(FilterDropDown);
