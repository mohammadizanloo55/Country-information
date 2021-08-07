import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { memo } from "react";
import { HiSearch } from "react-icons/hi";

const SearchInput = ({ InputType, Placeholder, onChange }) => (
  <InputGroup
    minWidth={{
      md: "500px",
    }}
  >
    <InputLeftElement
      pointerEvents="none"
      children={
        <Text color="gray.500" fontSize="2xl">
          <HiSearch />
        </Text>
      }
    />
    <Input
      onChange={onChange}
      border="none"
      boxShadow="md"
      type={InputType}
      placeholder={Placeholder}
      size="lg"
      _focus={{
        border: "none",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);",
      }}
    />
  </InputGroup>
);
export default memo(SearchInput);
