import React from "react";
import { Tr, Td, Button, Box } from "@chakra-ui/react";
import { FaExpandAlt, FaExternalLinkAlt } from "react-icons/fa";
import ResultTag from "./ResultTag";

const ExpandButtonTd = ({ item, toggleExpand }) => (
  <Td p={1}>
    <Button variant="unstyled" onClick={() => toggleExpand(item)}>
      <Box p={1} display="flex" justifyContent="center">
        <FaExpandAlt />
      </Box>
    </Button>
  </Td>
);

const ResultTd = ({ result }) => (
  <Td maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
    <ResultTag result={result} />
  </Td>
);

const TextTd = ({ children }) => (
  <Td maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
    {children}
  </Td>
);

const ChatHistoryTd = ({ chatHistory, openChatHistory }) => (
  <Td maxW="300px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
    <Button variant="unstyled" onClick={() => openChatHistory(chatHistory)}>
      <Box display="flex" alignItems="center">
        <FaExternalLinkAlt />
        <Box ml={2}>See Chat History</Box>
      </Box>
    </Button>
  </Td>
);

const getRowBg = (index) => (index % 2 === 0 ? "gray.900" : "gray.700");

const TableRow = ({ item, index, toggleExpand }) => (
  <Tr key={item.id} bg={getRowBg(index)} color="white">
    <ExpandButtonTd item={item} toggleExpand={toggleExpand} />
    <ResultTd result={item.result} />
    <TextTd>{item.personal_injury ? "Yes" : "No"}</TextTd>
    <TextTd>{item.case_started ? item.case_started : "not started"}</TextTd>
    <TextTd>{item.situation_begin}</TextTd>
    <TextTd>{item.created_at.slice(0, 16)}</TextTd>
    {/* <ChatHistoryTd chatHistory={item.chat_history} openChatHistory={openChatHistory} /> */}
  </Tr>
);

export default TableRow;
