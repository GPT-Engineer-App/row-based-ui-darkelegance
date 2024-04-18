import React from "react";
import { Slide, Box, Button } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ onClose }) => (
  <Button
    onClick={onClose}
    variant="unstyled"
    color="white"
    _hover={{ color: "gray.300" }}
    position="absolute"
    top="20px"
    right="20px"
  >
    <FaTimes />
  </Button>
);

const FieldRow = ({ field, firstColHeight }) => (
  <Box key={field.headline} display="flex" width="100%" mb={6}>
    <Box width="40%" pr={4}>
      <Box as="h4" fontSize="xl" fontWeight="bold" mb={2}>
        {field.headline}
      </Box>
      <Box as="p" fontSize="md">
        {field.description}
      </Box>
    </Box>
    <Box width="60%">
      <Box width="100%" bg="gray.700" borderRadius="md" p={2} whiteSpace="pre-wrap" minHeight={`${firstColHeight}px`}>
        {field.field_value}
      </Box>
    </Box>
  </Box>
);

const ExpandedPage = ({ isOpen, onClose, item }) => {
  const firstColRef = React.useRef();
  const [firstColHeight, setFirstColHeight] = React.useState(0);

  React.useEffect(() => {
    if (firstColRef.current) {
      setFirstColHeight(firstColRef.current.clientHeight);
    }
  }, []);

  if (!item) {
    return null;
  }

  const fields = [
    {
      headline: "What Happened",
      description: "Description of the incident",
      field_value: item.what_happened,
    },
    {
      headline: "How It Happened",
      description: "Explanation of the incident",
      field_value: item.how_happened,
    },
    {
      headline: "Short Summary",
      description: "Brief overview of the situation",
      field_value: item.short_summary,
    },
    {
      headline: "Parties Involved",
      description: "People or entities involved",
      field_value: item.parties_involved ? item.parties_involved.join(", ") : "",
    },
    {
      headline: "Consequences",
      description: "Outcomes of the incident",
      field_value: item.consequences ? item.consequences.join(", ") : "",
    },
    {
      headline: "Direct Cause",
      description: "Immediate trigger of the incident",
      field_value: item.direct_cause,
    },
    {
      headline: "Annotations",
      description: "Key terms extracted from the chat",
      field_value: item.annotations ? item.annotations.join(", ") : "",
    },
    {
      headline: "Cost",
      description: "Cost of the AI chat interaction",
      field_value: item.cost,
    },
  ];

  return (
    <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
      <Box p="40px" pt="60px" color="white" mt="4" bg="gray.800" rounded="md" shadow="md" width="75%" height="100vh" position="fixed" top="0" right="0" overflowY="auto">
        <CloseButton onClose={onClose} />
        {fields.map((field) => (
          <FieldRow key={field.headline} field={field} firstColHeight={firstColHeight} />
        ))}
      </Box>
    </Slide>
  );
};

export default ExpandedPage;