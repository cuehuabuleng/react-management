import React from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftjs from 'draftjs-to-html';

export default class Rich extends React.Component{
    state = {
        showRichText:false,
        editorState:''
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    }

    // 清空文本
    handleClearContent = () => {
        this.setState({
            editorState:''
        });
    }

    // 获取HTML文本
    handleGetText = () => {
       
        this.setState({
            showRichText:true
        })
    }

    onEditorChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    render(){
        const { editorState } = this.state;
        return(
            <div>
                <Card>
                    <Button type = 'primary' onClick = { this.handleClearContent }>清空文本</Button>
                    <Button type = 'primary' onClick = { this.handleGetText } style = {{ marginLeft:10 }}>获取html文本</Button>
                </Card>
                <Card title = '富文本编辑器'>
                    <Editor
                        editorState={ editorState }
                        onEditorStateChange={ this.onEditorStateChange }
                        onContentStateChange={ this.onEditorChange }
                    />
                </Card>
                <Modal
                title = '富文本'
                visible = { this.state.showRichText }
                onCancel = {() => {
                    this.setState({
                        showRichText:false
                    })
                }} 
                footer = { null }
                >
                    { draftjs(this.state.contentState )}
                </Modal>
            </div>
        )
    }
}