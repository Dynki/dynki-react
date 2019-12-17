import React, { useState } from 'react';
import { Radio, Select } from 'antd';
import styles from 'styled-components';
import Media from 'react-media';

const { Option } = Select;

const StyledContent = styles.div`
    margin: 30px;
`;

const StyledRadioGroup = styles(Radio.Group)`
    label:first-child {
        border-radius: 0px!important;
        border-left-color: #414141;
    }

    label:last-child {
        border-radius: 0px!important;
        border-right-color: #414141;
    }

    label {
        border-color: #414141;
   }
`;

const StyledButton = styles(Radio.Button)`
    background-color: ${props => props.selected ? '#2C82C1!important' : '#ffffff'};
    color: ${props => props.selected ? '#ffffff!important' : 'rgba(0, 0, 0, 0.65);'};
    border-radius: 0px!imporrtant;
`;

const PricingUsers =  ({ onSetUserCount }) => {

    const [teamSize, setTeamSize] = useState("2");
    const teamSizes = ["2", "5", "10", "15", "25", "50", "100", "200", "10000"];

    const onSetTeamSize = e => {
        setTeamSize(e.target.value);
        onSetUserCount(e.target.value);
    }

    const onSelectSetTeamSize = value => {
        setTeamSize(value);
        onSetUserCount(value);
    }

    const renderSelect = () => {
        return (
            <Select
                showSearch
                style={{ width: 300 }}
                placeholder="Select users"
                optionFilterProp="children"
                onChange={onSelectSetTeamSize}
                defaultValue="2"
                size="large"
            >
                {teamSizes.map((s, i) => (
                    <Option key={i} value={s}>{`${s==="10000" ? '200': s}${s==="10000" ? '+':''} Users`}</Option>
                ))}
            </Select>
        )
    }

    const renderRadio = () => {
        return (
            <StyledRadioGroup size="large" defaultValue="2" value={teamSize} onChange={onSetTeamSize}>
                {teamSizes.map((s, i) => (
                    <StyledButton selected={teamSize === s ? true : false}  value={s} key={i}>
                        {`${s==="10000" ? '200': s}${s==="10000" ? '+':''} Users`}
                    </StyledButton>
                ))}
            </StyledRadioGroup>
        )
    }

    return (
        <StyledContent>
            <Media queries={{
                small: "(max-width: 599px)",
                medium: "(min-width: 600px) and (max-width: 1199px)",
                large: "(min-width: 1200px)"
                }}>
                {matches => (
                    <React.Fragment>
                    {matches.small && renderSelect()}
                    {matches.medium && renderRadio()}
                    {matches.large && renderRadio()}
                    </React.Fragment>
                )}
            </Media>
        </StyledContent>
    );
}

export default PricingUsers;