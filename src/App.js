import React, { useState, useReducer } from 'react'
import { Tabs, Button } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

import './App.css'

import "antd/dist/antd.css"

const { TabPane } = Tabs;


function App() {

  const [keyTab, setTab] = useState("editor")

  /*
    保存富文本数据
  */
  const [editorState, setEditor] = useState(BraftEditor.createEditorState(null))


    /*
    富文本数据 HTML 字符串
  */
  const [previewHTML, updatePreviewHTML] = useReducer(()=> {
    return editorState.toHTML()
  }, "");


  const handleTabChange = (tab) => {
    setTab(tab)
    updatePreviewHTML()
  }

  return (


    <div className="App">

    <Tabs defaultActiveKey={keyTab} onChange={handleTabChange} type="card">

      <TabPane TabPane tab="editor" key="editor" >
        <BraftEditor value={editorState} onChange={(editorState) => setEditor(editorState)}/>
      </TabPane>

      <TabPane tab="preview" key="preview">
        <div dangerouslySetInnerHTML={{__html: previewHTML}}>
        </div>
      </TabPane>
    </Tabs>
    </div>
  )
}

export default App
