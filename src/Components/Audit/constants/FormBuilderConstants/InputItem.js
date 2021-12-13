import { v4 as uuidv4 } from "uuid";
export const inputItem = [
  { name: "Date Range", id: uuidv4(), label: "isDateRange", valueType: "date" },
  { name: "Dropdown", id: uuidv4(), label: "", valueType: "select" },
  { name: "Radiobox", id: uuidv4(), label: "isRadio", valueType: "radio" },
  {
    name: "Checkbox",
    id: uuidv4(),
    label: "isCheckbox",
    valueType: "checkbox",
  },
  {
    name: "Text Field",
    id: uuidv4(),
    label: "isRequirement",
    valueType: "text",
  },
  { name: "Answer", id: uuidv4(), label: "", valueType: "text" },
  { name: "File Type", id: uuidv4(), label: "isAttached", valueType: "file" },
];
