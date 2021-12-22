import { v4 as uuidv4 } from "uuid";
export const inputItem = [
  { name: "Date Range", id: uuidv4(), label: "isDateRange", valueType: "Date" },
  { name: "Dropdown", id: uuidv4(), label: "", valueType: "Select" },
  { name: "Radiobox", id: uuidv4(), label: "isRadio", valueType: "Radio" },
  {
    name: "Checkbox",
    id: uuidv4(),
    label: "isCheckbox",
    valueType: "CheckBox",
  },
  {
    name: "Text Field",
    id: uuidv4(),
    label: "isRequirement",
    valueType: "Text",
  },
  { name: "Answer", id: uuidv4(), label: "", valueType: "Text" },
  { name: "File Type", id: uuidv4(), label: "isAttached", valueType: "Attach" },
];
