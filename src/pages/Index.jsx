import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, TableContainer } from "@chakra-ui/react";
import ExpandedPage from "../components/ExpandedPage";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import { supabase } from "../lib/helper/supabase.js";
import Navbar from "../components/Navbar";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [selectedChatHistory, setSelectedChatHistory] = useState("");
  const [chatbotResults, setChatbotResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleExpand = (item) => {
    setSelectedItem(item);
    setIsExpanded(true);
  };

  // const openChatHistory = (chatHistory) => {
  //   setSelectedChatHistory(chatHistory);
  //   setIsChatHistoryOpen(true);
  // };

  const fetchChatbotResults = async () => {
    const { data, error } = await supabase.from("chatbot_results").select("*");

    if (error) {
      console.error("Error fetching chatbot results:", error);
      return
    }
    if (data.length === chatbotResults.length) {
      console.log("No new results");
      return;
    }
    console.log("New results");
    setChatbotResults(data);
  };

  useEffect(() => {
    fetchChatbotResults();
    const interval = setInterval(fetchChatbotResults, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box bg="gray.900" minH="100vh">
      <Navbar />
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <TableHeader />
          </Thead>
          <Tbody>
            {chatbotResults.map((item, index) => (
              <TableRow
                key={item.id}
                item={item}
                index={index}
                toggleExpand={() => toggleExpand(item)}
              // openChatHistory={openChatHistory}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ExpandedPage isOpen={isExpanded} onClose={() => setIsExpanded(false)} item={selectedItem} />
      {/* <ChatHistoryModal isOpen={isChatHistoryOpen} onClose={() => setIsChatHistoryOpen(false)} chatHistory={selectedChatHistory} /> */}
    </Box>
  );
};

export default Index;
