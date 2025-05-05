import { Card, CardBody, Box, Text } from "@chakra-ui/react";
import MyLinks from "./MyLinks";

const Footer = () => {
  return (
    <Card
      borderRadius="none"
      position="fixed"
      bottom="0"
      width="100%"
      as="footer"
    >
      <CardBody>
        <Box display="flex" flexDirection="column" alignItems="center">
          <MyLinks />
          <Text mr="5px" mt="10px">
            Built using:
          </Text>
          <Text>Backend: Spring Boot, Java 17, MySQL</Text>
          <Text textAlign="center">DevOps: Docker, GitHub Actions (CI/CD)</Text>
          <Text textAlign="center">
            Frontend: React, Typescript, Chakra UI, React Query, Zustand
          </Text>
          <Text mt="10px">© 2024 Patrick V. All rights reserved.</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Footer;
