import React from 'react';
import { Card, Tabs, message, Icon } from 'antd';
import './ui.less';
const { TabPane } = Tabs;

export default class Tab extends React.Component{

    newTabIndex =0;
    handelCallback = (key) => {
        message.info("您当前选择了标签"+key)
    }

    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title:'Tab 2',
                content: 'Tab 2',
                key:'2'
            },
            {
                title:'Tab 3',
                content: 'Tab 3',
                key:'3'
            },
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }

    onChange = activeKey => {
        this.setState({ activeKey });
      };

      onEdit = (targetKey, action) => {
        this[action](targetKey);
      };

      add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };

    render(){
        return(
            <div>
                <Card title = 'tab 页签' className = 'card-wrap'>
                    <Tabs defaultActiveKey="1"  onChange = { this.handelCallback }>
                        <TabPane tab="Tab 1" key="1">
                        Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                        Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                        </TabPane>
                    </Tabs>,
                </Card>

                <Card title = '带图tab页签' className = 'card-wrap'>
                    <Tabs defaultActiveKey="1"  onChange = { this.handelCallback }>
                        <TabPane tab= { <span> <Icon type = 'plus'/> tabs 1 </span>} key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab= { <span> <Icon type = 'edit'/> tabs 1 </span>} key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab= { <span> <Icon type = 'delete'/> tabs 1 </span>} key="3">
                             Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title = '带图tab页签' className = 'card-wrap'>
                    <Tabs 
                        activeKey={this.state.activeKey}
                        onChange={this.onChange}
                        onEdit={ this.onEdit }
                        type = 'editable-card'
                    >
                        {
                            this.state.panes.map((panes) => {
                                return <TabPane tab = { panes.title } key = { panes.key }>{ panes.content }</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}