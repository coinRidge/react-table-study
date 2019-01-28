import React from 'react';
import { Table, Button } from 'antd';
import EditableCell from './EditableCell';

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.dataSource
    };
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      name: record.name,
    }),
  };

  addHandler = () => {
    const { dataSource } = this.state;
    const newData = {
      key: dataSource.length.toString(),
    };
    dataSource.push(newData)
    this.setState({ dataSource });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          inputType: col.inputType,
          sourceCode: col.sourceCode,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
      <div>
        <Button onClick={this.addHandler} type="primary" style={{ marginBottom: 16 }}>
          Add
        </Button>
        <Button onClick={this.addHandler} type="primary" style={{ marginLeft: 10, marginBottom: 16 }}>
          Delete
        </Button>
        <Table
          rowSelection={this.rowSelection}
          components={components}
          bordered
          dataSource={this.state.dataSource}
          columns={columns}
          rowClassName="editable-row"
          pagination = {false}
        />
      </div>
    );
  }
}