import React from 'react';
import { Card, Form, Button, Input, Checkbox, Select, Switch, Radio, TimePicker, DatePicker, Upload, Icon, InputNumber, message} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;
class Fromregister extends React.Component{

    state = {
        loading: false,
    }

    handleSubmit = () => {
      let userinfo = this.props.form.getFieldsValue();
      console.log((userinfo))
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }


    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

    render(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xsa:24,
                sm:12
            }
        }
        const offsetLayout = {
          wrapperCol:{
            xs:24,
            sm:{
              span:12,
              offset:4
            }
          }
        }
        return(
            <div>
                <Card title = '注册表单'>
                    <Form layout = 'horizontal'>
                        <FormItem label = '用户名' { ...formItemLayout }>
                            {
                                getFieldDecorator('username', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ],
                                  })(
                                    <Input
                                      placeholder="请输入用户名"
                                    />,
                                  )
                            }
                        </FormItem>
                        <FormItem label = '密码' { ...formItemLayout }>
                        {
                                getFieldDecorator('userpsw', {
                                    initialValue:'',
                                    rules: [
                                        {
                                            required:true,
                                            message:'密码不能空'
                                        },
                                    ],
                                  })(
                                    <Input
                                    type = 'password'
                                      placeholder="请输入密码"
                                    />,
                                  )
                            }
                        </FormItem>
                        <FormItem label = '性别' { ...formItemLayout }>
                        {
                                getFieldDecorator('sex', {
                                    initialValue:'1'
                                  })(
                                      <RadioGroup>
                                          <Radio value = '1'>男</Radio>
                                          <Radio value = '2'>女</Radio>
                                      </RadioGroup>
                                  )
                            }
                        </FormItem>

                        <FormItem label = '年龄' { ...formItemLayout }>
                        {
                                getFieldDecorator('age', {
                                    initialValue:18
                                  })(
                                      <InputNumber/>
                                  )
                            }
                        </FormItem>

                        
                        <FormItem label = '当前状态' { ...formItemLayout }>
                        {
                                getFieldDecorator('state', {
                                    initialValue:'2'
                                  })(
                                      <Select>
                                          <Option value = '1'>咸鱼一条</Option>
                                          <Option value = '2'>风华浪子</Option>
                                          <Option value = '3'>北大才子一枚</Option>
                                          <Option value = '4'>百度FE</Option>
                                          <Option value = '5'>创业者</Option>
                                      </Select>
                                  )
                            }
                        </FormItem>

                        <FormItem label = '爱好' { ...formItemLayout }>
                        {
                                getFieldDecorator('like', {
                                    initialValue:['2','5']
                                  })(
                                      <Select mode = 'multiple'>
                                          <Option value = '1'>游泳></Option>
                                          <Option value = '2'>打篮球</Option>
                                          <Option value = '3'>踢足球</Option>
                                          <Option value = '4'>跑步</Option>
                                          <Option value = '5'>爬山</Option>
                                          <Option value = '6'>骑行</Option>
                                          <Option value = '7'>桌球</Option>
                                          <Option value = '8'>麦霸</Option>
                                      </Select>
                                  )
                            }
                        </FormItem>

                        <FormItem label = '是否已婚' { ...formItemLayout }>
                        {
                                getFieldDecorator('isMarried', {
                                    valuePropName:'checked',
                                    initialValue:true
                                  })(
                                      <Switch/>
                                  )
                            }
                        </FormItem>

                        <FormItem label = '生日' { ...formItemLayout }>
                        {
                                getFieldDecorator('birthday', {
                                    initialValue:moment('2019-09-09 12:00:59')
                                  })(
                                      <DatePicker
                                      showTime
                                      format = 'YYY-MM-DD HH:mm:ss'
                                      />
                                  )
                            }
                        </FormItem>

                        <FormItem label = '联系地址' { ...formItemLayout }>
                        {
                                getFieldDecorator('address', {
                                    initialValue:'广东省湛江市麻章区广东海洋大学'
                                  })(
                                      <TextArea
                                      autosize ={
                                          {
                                            minRows: 2, maxRows: 6 
                                          }
                                      }
                                      />
                                  )
                            }
                        </FormItem>

                        <FormItem label = '早起时间' { ...formItemLayout }>
                        {
                                getFieldDecorator('time', {
                                  })(
                                      <TimePicker/>
                                  )
                            }
                        </FormItem>

                        <FormItem label = '头像' { ...formItemLayout }>
                        {
                                getFieldDecorator('userImg', {
                                  })(
                                      <Upload
                                      listType = 'picture-card'
                                      showUploadList = { false }
                                      beforeUpload={this.beforeUpload}
                                      onChange={this.handleChange}
                                      action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                      >
                                          {
                                              this.state.imageUrl?<img src = { this.state.imageUrl }  style = {{width:"100%"}}/>: uploadButton
                                          }
                                      </Upload>
                                  )
                            }
                        </FormItem>

                        
                        <FormItem  { ...offsetLayout }>
                        {
                                getFieldDecorator('time', {
                                  })(
                                    <Checkbox>
                                        我已经阅读过<a href="#">慕课协议</a>
                                    </Checkbox>
                                  )
                            }
                        </FormItem>

                        <FormItem  { ...offsetLayout }>
                          <Button type = 'primary' onClick = { this.handleSubmit }>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Fromregister);