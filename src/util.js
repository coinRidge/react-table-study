import React from 'react';
import {Select} from 'antd';
import BKS from './dynamic';

const getOption = sourceCode => {
    const Option = Select.Option;
    return BKS.Scodes._codetable[sourceCode].map(item => {
        return <Option key={item[0]} value={item[0]}>{item[1]}</Option>
    })
}

export {getOption};