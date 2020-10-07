import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse



function SortByName(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        //qe so i check currentIndex kthen -1 dmth nuk osht checked edhe e shtina narray
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            //nese osht i checked e hjekum se ka me kthy 1 indeksi
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        //ja jepum home pagit arrayn e ri
        props.handleFilters(newChecked)


    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                //me at qasaj _id kena me dit cilin check box e kena kliku
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                //me dit cilen me ndryshu clicked a jo
                //-1 nuk o clicked 1 osht
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />&nbsp;&nbsp;
            <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="types" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default SortByName
