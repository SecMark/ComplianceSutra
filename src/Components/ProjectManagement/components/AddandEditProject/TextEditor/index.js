import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import bold from "../../../../../assets/Icons/EditorIcons/bold.png";
import underline from "../../../../../assets/Icons/EditorIcons/underline.png";
import overline from "../../../../../assets/Icons/EditorIcons/overline.png";
import superscript from "../../../../../assets/Icons/EditorIcons/superscript.png";
import subscript from "../../../../../assets/Icons/EditorIcons/subscript.png";
import unordered from "../../../../../assets/Icons/EditorIcons/unordered.png";
import ordered from "../../../../../assets/Icons/EditorIcons/ordered.png";
import indent from "../../../../../assets/Icons/EditorIcons/indent.png";
import outdent from "../../../../../assets/Icons/EditorIcons/outdent.png";
import left from "../../../../../assets/Icons/EditorIcons/leftalign.png";
import right from "../../../../../assets/Icons/EditorIcons/rightalign.png";
import center from "../../../../../assets/Icons/EditorIcons/center.png";
import justify from "../../../../../assets/Icons/EditorIcons/justifycontet.png";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "./style.css";
function TextEditor({ values, setValues }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [description, setDescription] = useState("");
  console.log(description);
  const handleChange = (rawDraftContentState) => {
    const data = draftToHtml(
      convertToRaw(rawDraftContentState.getCurrentContent())
    );
    setDescription(data);
    setValues({
      ...values,
      project_overview: data,
    });
  };
  return (
    <div>
      <Editor
        editorClassName="add-project-editor-box"
        toolbarClassName="add-project-text-editor"
        wrapperClassName="add-project-tex-editor-wrapper"
        // editorState={editorState}
        //  onChange={setEditorState}
        defaultEditorState={editorState}
        onEditorStateChange={(editorState) => {
          setEditorState(editorState);
          handleChange(editorState);
        }}
        toolbar={{
          options: ["inline", "list", "textAlign", "remove"],
          inline: {
            options: [
              "bold",
              "underline",
              "strikethrough",
              "superscript",
              "subscript",
            ],
            bold: { icon: bold, className: "demo-option-custom" },
            underline: { icon: underline, className: "demo-option-custom" },
            strikethrough: { icon: overline, className: "demo-option-custom" },
            superscript: { icon: superscript, className: "demo-option-custom" },
            subscript: { icon: subscript, className: "demo-option-custom" },
          },
          remove: {},
          list: {
            unordered: { icon: unordered, className: "demo-option-custom" },
            ordered: { icon: ordered, className: "demo-option-custom" },
            indent: { icon: indent, className: "demo-option-custom" },
            outdent: { icon: outdent, className: "demo-option-custom" },
          },

          textAlign: {
            left: { icon: left, className: "demo-option-custom" },
            center: { icon: center, className: "demo-option-custom" },
            right: { icon: right, className: "demo-option-custom" },
            justify: { icon: justify, className: "demo-option-custom" },
          },
        }}
      />
    </div>
  );
}

export default TextEditor;
