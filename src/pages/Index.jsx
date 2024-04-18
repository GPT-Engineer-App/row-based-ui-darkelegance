import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, TableContainer } from "@chakra-ui/react";
import ExpandedPage from "../components/ExpandedPage";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import { supabase } from "../lib/helper/supabase.js";
import { isEqual } from "lodash";
import Navbar from "../components/Navbar";

const data = [
  {
    id: 1,
    created_at: "2024-04-15 07:42:38.763008+00",
    case_started: "2024-04-01",
    personal_injury: true,
    result: "accepted",
    situation_begin: "2024-04-13",
    type_injury: "Occupational accidents",
    what_happened: "Heavy machinery fell on the claimant while they were working.",
    how_happened: "The cause of the heavy machinery falling is unknown.",
    chat_history: `[{"role":"assistant","content":"Hello! I'm here to help you with your situation. Let's begin with:  \\nWhat can I help you with? "},
{"role":"user","content":"I was working my shift when some heavy machinery suddenly fell ontop of me."},
...
{"role":"user","content":"Correct"}]`,
  },
  {
    id: 2,
    created_at: "2024-04-12 09:15:22.358741+00",
    case_started: "2024-03-28",
    personal_injury: false,
    result: "requires attention",
    situation_begin: "2024-04-10",
    type_injury: "Slip and fall",
    what_happened: "The claimant slipped on a wet floor at a grocery store.",
    how_happened: "There were no warning signs about the wet floor.",
    chat_history: `[{"role":"assistant","content":"Hi there, I understand you had a slip and fall accident. Can you tell me more about what happened?"},
{"role":"user","content":"I was shopping at the grocery store and slipped on a wet floor. There were no signs warning about it."},
...
{"role":"user","content":"Yes, that's correct."}]`,
  },
  {
    id: 3,
    created_at: "2024-04-12 14:37:09.185294+00",
    case_started: "2024-04-05",
    personal_injury: true,
    result: "denied",
    situation_begin: "2024-04-11",
    type_injury: "Car accident",
    what_happened: "The claimant was rear-ended while stopped at a red light.",
    how_happened: "The other driver was distracted and did not brake in time.",
    chat_history: `[{"role":"assistant","content":"I'm sorry to hear about your car accident. Let's go over the details. When and where did this happen?"},
{"role":"user","content":"It happened yesterday around 5pm. I was stopped at a red light and suddenly got rear-ended."},
...  
{"role":"user","content":"No, that covers it. Thanks for your help."}]`,
  },
];

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [selectedChatHistory, setSelectedChatHistory] = useState("");
  const [chatbotResults, setChatbotResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleExpand = (item) => {
    setSelectedItem(item);
    setIsExpanded(!isExpanded);
  };

  const openChatHistory = (chatHistory) => {
    setSelectedChatHistory(chatHistory);
    setIsChatHistoryOpen(true);
  };

  const fetchChatbotResults = async () => {
    const { data, error } = await supabase.from('chatbot_results').select("*");

    if (error) {
      console.error('Error fetching chatbot results:', error);
    } else {
      const formattedData = data.map((item) => ({
        id: item.uuid,
        created_at: item.created_at,
        case_started: item.case_started,
        short_summary: item.short_summary,
        personal_injury: item.personal_injury,
        result: item.result,
        situation_begin: item.situation_begin,
        type_injury: item.type_injury,
        what_happened: item.what_happened,
        how_happened: item.how_happened,
        chat_history: item.chat_history,
        annotations: item.annotations,
        parties_involved: item.parties_involved,
        consequences: item.consequences,
        cost: item.cost,
        direct_cause: item.direct_cause,
      }));

      if (!isEqual(formattedData, chatbotResults)) {
        setChatbotResults(formattedData);
      }
    }
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
      <ExpandedPage isOpen={isExpanded} onClose={toggleExpand} item={selectedItem} />
      {/* <ChatHistoryModal isOpen={isChatHistoryOpen} onClose={() => setIsChatHistoryOpen(false)} chatHistory={selectedChatHistory} /> */}
    </Box >
  );
};

export default Index;
