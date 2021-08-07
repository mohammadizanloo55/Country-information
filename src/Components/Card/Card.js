import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { forwardRef, memo } from "react";
import { Img } from "react-image";
import { Link } from "react-router-dom";

const Card = forwardRef((props, ref) => (
  <Link ref={ref} to={`/${props.Title}`} style={{ width: "100%" }}>
    <Box w="100%" h="100%" boxShadow="lg" borderRadius="xl" overflow="hidden">
      <Flex
        height={{
          base: "190px",
          sm: "170px",
          md: "200px",
          xl: "250px",
        }}
      >
        <Img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={props.ImageUrl}
          alt={props.ImageAlt}
        />
      </Flex>

      <Box p="5">
        <Heading as="p" fontSize="xl" mb="3">
          {props.Title}
        </Heading>

        {props.Details.map(({ Title, Value }) => (
          <Flex key={Title} my="1">
            <Text as="strong" fontSize="md">
              {Title}:
            </Text>
            <Text as="p" ml="1" fontSize="md">
              {Value}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  </Link>
));

export default memo(Card);
