import { Spinner } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    w="100%"
    h="100%"
    bg="rgba(0, 0, 0, 0.4)"
    display="flex"
    justifyContent="center"
    alignItems="center"
    zIndex="9999"
  >
    <Spinner size="xl" color="white" />
  </Box>
);

export default LoadingSpinner;