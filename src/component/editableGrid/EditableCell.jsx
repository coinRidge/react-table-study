import React from 'react';
import Context from '../../context/BookingFormContext';
import {Input, InputNumber, Checkbox, Form, Select, Tooltip} from 'antd';
import {getOption} from '../../util';

const FormItem = Form.Item;

export default class EditableCell extends React.Component {    

    getInput = () => {
        const style = {
            width: '100%',
        }
        const {inputType, sourceCode} = this.props;
        if (inputType === 'InputNumber') {
            return (
                <InputNumber style={style} />
            );
        } else if (inputType === 'Checkbox') {
            return <Checkbox />;
        } else if (inputType === 'Select') {
            return (
                <Select>
                    {getOption(sourceCode)}
                </Select>
            );
        } 
        return <Input style={style}/>;
    }

    render() {
        const {
            dataIndex,
            title,
            inputType,
            record,
            index,
            editable,
            sourceCode,
            ...restProps
        } = this.props;
        return (
            <Context.Consumer>
                {(form) => {
                    const { getFieldDecorator, getFieldError} = form;
                    return (
                        <td {...restProps} style={{textAlign: 'center', padding: '0 0'}}>
                            {editable ? (
                                <FormItem style={{ margin: 0 }}>
                                    <Tooltip title={getFieldError(`${record.key}-${dataIndex}`)}>
                                        {getFieldDecorator(`${record.key}-${dataIndex}`, {
                                            rules: [{
                                                required: true,
                                                message: `Please Input ${title}!`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(this.getInput())}
                                    </Tooltip>
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </Context.Consumer>
        );
    }
}