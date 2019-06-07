import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from '../table';

const columns = [
    {
        label: 'Date',
        prop: 'date',
        width: 180
    },
    {
        label: 'Name',
        prop: 'name',
        width: 180
    },
    {
        label: 'Address',
        prop: 'address'
    }
];


const columnsResizable = [
    {
        label: 'Date',
        prop: 'date',
        width: 180,
        resizable: true
    },
    {
        label: 'Name',
        prop: 'name',
        width: 180,
        resizable: true
    },
    {
        label: 'Address',
        prop: 'address'
    }
];

const columnsMultipleSelect = [
    {
        type: 'selection',
        align: 'center'
    },
    {
        label: 'Date',
        prop: 'date',
        width: 180
    },
    {
        label: 'Name',
        prop: 'name',
        width: 180
    },
    {
        label: 'Address',
        prop: 'address'
    }
];

const data = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
];

let expandableState = {
    columns: [
        {
            type: 'expand',
            expandPannel: function (data) {
                return (
                    <div>
                        <p>State: {data.state}</p>
                        <p>City: {data.city}</p>
                        <p>Address: {data.address}</p>
                        <p>Zip: {data.zip}</p>
                    </div>
                )
            }
        },
        {
            label: 'Date',
            prop: 'date',
            width: 400
        },
        {
            label: 'Name',
            prop: 'name',
            width: 400
        }
    ],
    data: [
        {
            date: '2016-05-03',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-04',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-01',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-08',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-06',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }, {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036'
        }
    ]
}

const columnsSummary = [
    {
      label: "ID",
      prop: "id",
    },
    {
      label: "Name",
      prop: "name",
    },
    {
      label: "Amount 1",
      prop: "amount1"
    },
    {
      label: "Amount 2",
      prop: "amount2"
    },
    {
      label: "Amount 3",
      prop: "amount3"
    }
  ];

const dataSummary =  [{
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  }, {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  }, {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9
  }, {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17
  }, {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15
  }];


storiesOf('Dados | Table', module)
    .add('basic', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columns}
                    data={data}
                />
            </div>
        )
    })
    .add('striped', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columns}
                    data={data}
                    stripe={true}
                />
            </div>
        )
    })
    .add('border', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columns}
                    data={data}
                    border={true}
                    resizable = {false}
                />
            </div>
        )
    })
    .add('single select', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columns}
                    data={data}
                    border={true}
                    highlightCurrentRow={true}
                    onCurrentChange={item => console.log(item)}
                />
            </div>
        )
    })
    .add('multiple select', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columnsMultipleSelect}
                    data={data}
                    border={true}
                    height={250}
                    onSelectChange={(selection) => {
                        console.log(selection)
                    }}
                    onSelectAll={(selection) => {
                        console.log(selection)
                    }}
                />
            </div>
        )
    })
    .add('hidden header', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columnsMultipleSelect}
                    data={data}
                    border
                    showHeader={false}
                    height={250}
                    onSelectChange={(selection) => {
                        console.log(selection)
                    }}
                    onSelectAll={(selection) => {
                        console.log(selection)
                    }}
                />
            </div>
        )
    })
    .add('expandable', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={expandableState.columns}
                    data={expandableState.data}
                    border={false}
                    onCurrentChange={item => {
                        console.log(item)
                    }}
                />
            </div>
        )        
    })
    .add('summary row', () => {
        return (
            <div>
                <Table
                    style={{width: '100%', marginTop: 20}}
                    showSummary={true}
                    columns={columnsSummary}
                    data={dataSummary}
                    sumText='Total price'
                    summaryMethod={(columns, data)=>{
                        const dataList = [];
                        for(var i=0; i < columns.length; i++){
                            let total = 0;
                            for(let j=0; j < data.length; j++){
                            let value = data[j][columns[i]['property']];

                            if(isNaN(value)){
                                total = 'N/A'
                                break;
                            }else{
                                total += parseFloat(value);
                            }
                            }
                            dataList[i] = isNaN(total) ? total : '$ ' + total;
                        }
                        return dataList;
                        }}
                    border={true}
                />
            </div>
        )        
    })
    .add('resizable row', () => {
        return (
            <div>
                <Table
                    style={{ width: '100%' }}
                    columns={columnsResizable}
                    data={data}
                    border = {true}
                />
            </div>
        )
    });


