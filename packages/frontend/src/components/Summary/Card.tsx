import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import {
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
  RiBarChartHorizontalFill,
} from "react-icons/ri";

interface CardProps {
  title: string;
  value: string;
  type: "withdraw" | "deposit" | "result";
}

const icons = {
  withdraw: RiArrowDownCircleFill,
  deposit: RiArrowUpCircleFill,
  result: RiBarChartHorizontalFill,
};

export const Card = ({ title, value, type }: CardProps) => {
  return (
    <Stack
      p="8"
      boxShadow="0 0 10px #0003"
      rounded="md"
      bg={type !== "result" ? "gray.800" : "green.700"}
      spacing="8"
    >
      <Flex justify="space-between" align="center">
        <Text>{title}</Text>
        <Icon
          as={icons[type]}
          color={
            type === "deposit"
              ? "green.500"
              : type === "withdraw"
              ? "red.500"
              : "gray.100"
          }
          fontSize="2xl"
        />
      </Flex>
      <Text fontSize="4xl" fontWeight="black">
        {value}
      </Text>
    </Stack>
  );
};
