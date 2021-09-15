import React, { useState } from "react";
import "./style.css";
import { AiFillPlusCircle,AiFillFile } from "react-icons/ai";

function AddReferences() {
  const [state,setState] = useState({
    files:[],
    changedFileIndex: -1
  })
  console.log(state.files);
  const fileUpload = (e) => {
    let changedFile = e.target.files[0];
    let uploadedFiles = e.target.files;

    if (state.changedFileIndex >= 0) {
        setState(prevState => {
            const list = [];
            prevState.files.map((file, i) => {
                if (i === prevState.changedFileIndex)
                    list.push(changedFile);
                else
                    list.push(file);
            });
            return {
                files: list,
                changedFileIndex: -1,
            };
        });
    } else if (state.files.length > 0) {
        setState(prevState => {
            return {files: [...prevState.files, ...uploadedFiles]}
        });
    } else
        setState({files: [...e.target.files]});
};
  return (
    <div>
      <div>
        <h1 className="RD-document">Reference Documents</h1>
        {/* <button className="RD-fileadd" type="file">
          <AiFillPlusCircle className="BD-Add-button" />{" "}
          <span className="BD-Addtempo">ADD New File</span>
          
        </button> */}
        <div>
           {state.files.map((files,i)=>(
             <div>
               <div className="RD-filesinput">
              <h1 className="RD-filebox"><AiFillFile style={{color:"black"}}/> {files.name} {console.log(i)}</h1>
                 </div>
               </div>
               
               
           ))} 
          {console.log(state.files)}
        </div>
        <label class="custom-file-upload" onChange={fileUpload}>
          <input multiple="multiple" className="RD-fileadd" type="file" />
          <AiFillPlusCircle className="BD-Add-button" />{" "}
          <span className="BD-Addtempo">ADD New File</span>
        </label>
      </div>
    </div>
  );
}

export default AddReferences;
