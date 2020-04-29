import React from 'react';
import utils from './../../utils/utils';
import { Table } from 'antd';
 export default class ETable extends React.Component{
    //处理点击事件
    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        if (rowSelection === 'checkbox') {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectItem = this.props.selectItem
            let selectIds = this.props.selectIds;
            console.log(this.props)
            if (selectIds) {
                const i = selectIds.indexOf(record.id);
                if (i === -1) { //避免重复添加
                    selectIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectItem.push(record);
                }else{
                    selectIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectItem.splice(i, 1);
                }
            }else{
                selectIds = [record.id];
                selectedRowKeys = [index];
                selectItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectItem, selectIds)
        }else{
            let selectedRowKeys = [index];
            let selectItem = record;
            this.props.updateSelectedItem(selectedRowKeys, selectItem)
        }
    }

    tableInit = () => {
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        }else if (row_selection === 'checkbox') {
            rowSelection.type = 'checkbox';
        }else {
            row_selection = 'radio';
        }
        return <Table
                bordered
                { ...this.props }
                rowSelection={ row_selection ? rowSelection : null }
                onRow = {(record, index) => {
                    return {
                        onClick: () => {
                            if (!row_selection) {
                                return;
                            }
                            this.onRowClick(record, index)
                        }
                    }
                }}
        />
    }

     render(){
         return(
             <div>
                 { this.tableInit() }
             </div>
         )
     }
 }