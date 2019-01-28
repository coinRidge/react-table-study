import React, { Component } from 'react';
import './App.css';
import {Tabs, Form, Button, Row, Col, Select} from 'antd';
import Context from './context/BookingFormContext';
import EditableTable from './component/editableGrid/EditableTable';
import generalContainerInfo from './config/generalContainerInfo';
import {getOption} from './util';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const data = [];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i.toString(),
  });
}

class App extends Component {

  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callback(key) {
    console.log(key);
  }
  
  handleSubmit = e => {
    const {validateFields} = this.props.form;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('form: ', values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container_center">
        <Form onSubmit={this.handleSubmit}>
            
            <Context.Provider value={this.props.form}>
                <Tabs onChange={this.callback}>
                    <TabPane tab='Booking Form' key='1'>
                        <Row gutter={24}>
                          <Col span={8}>
                              <FormItem label='Haulier Name'>
                                  {getFieldDecorator('booking.haulierCode', {
                                      rules: [{
                                          required: true,
                                          message: `Please Input Haulier Name!`,
                                      }],
                                  })(
                                      <Select style={{ width: '100%' }}>
                                          {getOption('haulier')}
                                      </Select>
                                  )}
                              </FormItem>
                          </Col>
                          <Col span={8}>
                              <FormItem label='Haulier Name'>
                                  {getFieldDecorator('booking.haulierCode', {
                                      rules: [{
                                          required: true,
                                          message: `Please Input Haulier Name!`,
                                      }],
                                  })(
                                      <Select style={{ width: '100%' }}>
                                          {getOption('haulier')}
                                      </Select>
                                  )}
                              </FormItem>
                          </Col>
                          <Col span={8}>
                              <FormItem label='Haulier Name'>
                                  {getFieldDecorator('booking.haulierCode', {
                                      rules: [{
                                          required: true,
                                          message: `Please Input Haulier Name!`,
                                      }],
                                  })(
                                      <Select style={{ width: '100%' }}>
                                          {getOption('haulier')}
                                      </Select>
                                  )}
                              </FormItem>
                          </Col>
                      </Row>
                        <EditableTable columns={generalContainerInfo} dataSource={data}/>
                    </TabPane>
                    <TabPane tab='Container & Cargo' key='2'></TabPane>
                </Tabs>
            </Context.Provider>
            <FormItem>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create({})(App);
