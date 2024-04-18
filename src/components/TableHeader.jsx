import React from "react";
import { Tr, Th } from "@chakra-ui/react";

const EmptyTh = () => <Th color="white" p={1}></Th>;

const HeaderTh = ({ children }) => (
  <Th color="white" maxW="300px">
    {children}
  </Th>
);

const headers = [{ label: "Result" }, { label: "Reason" }, { label: "Personal Injury" }, { label: "Case Started" }, { label: "Situation Begin" }, { label: "Created At" }];
// const headers = [{ label: "Result" }, { label: "Personal Injury" }, { label: "Case Started" }, { label: "Situation Begin" }, { label: "Created At" }, { label: "Chat History" }];

const TableHeader = () => (
  <Tr>
    <EmptyTh />
    {headers.map((header, index) => (
      <HeaderTh key={index}>{header.label}</HeaderTh>
    ))}
  </Tr>
);

export default TableHeader;
