import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
export default{
    // 对时间戳进行分格式化
    formateDate(time){
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },
    // 分页设置
    pagination(data, callback){
        let page = {
            onChange:(current) => {
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotal:() => {
                return `共${data.result.total}条`
            },
            showSizeChanger:true
        }
        return page;
    },
    
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item, index)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectItem(selectedRowKeys, selectItem, selectIds){
        if (selectIds) {
            this.setState({
                selectedRowKeys,
                selectItem,
                selectIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectItem
            })
        }
    }
}
