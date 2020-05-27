import React, { useState } from 'react'
import styles from 'styled-components'
import { Card, Divider, Statistic, Icon, Popconfirm, Popover, Tooltip, Typography } from 'antd';

const { Text } = Typography;

const Container = styles.div`
    bottom: 10px;
    display: flex;
    justify-content: center;
    margin-right: 10px;
    position: fixed;
    right: 1px;
    width: 500px;
    z-index: 100;

    .ant-card-body {
        padding: 5px;
    }
`

const Content = styles.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: 10px;
`

const Tiles = styles.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-left: auto;
    margin-right: 20px;
    margin-top: 5px;
`

const Tile = styles.button`
    align-items: center;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 59px;
    justify-content: center;
    margin-right: 10px;
    width: 75px;

    &:hover {
        color: #3095DE;
    }

    &:focus {
        outline: none;
    }
`

const TileClose = styles.button`
    align-items: center;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 59px;
    justify-content: center;
    margin-left: 20px;
    width: 20px;

    &:hover {
        color: #3095DE;
    }

    &:focus {
        outline: none;
    }
`

const PopButton = styles.button`
    align-items: center;
    background-color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;

    &:hover {
        background-color: #3095DE;
        color: #ffffff;
    }

    &:focus {
        outline: none;
    }
`

const PopButtonIcon = styles(Icon)`
    font-size: 15px;
    margin-right: 10px;
`

const StyledIcon = styles(Icon)`
    font-size: 35px;
`

const StyledDivider = styles(Divider)`
    height: 60px;
`

const BoardSelections = ({ onDeselect, onMoveGroup, onDelete, selectedRows, groups }) => {

    const [state, setState] = useState({ selectGroup: false })

    const content = (
        <div>
            {state.selectGroup ?
                groups.map((g,i) => {
                    return (
                        <PopButton key={i} onClick={() => onMoveGroup(g.id)}>
                            {g.name}
                        </PopButton>
                    )
                })
            :
                <PopButton onClick={() => setState({ selectGroup: true })}>
                    <PopButtonIcon type="right-circle" theme="twoTone" />
                    Move to group
                </PopButton>
            }
        </div>
    );

    return (
        <Container>
            <Card 
                bodyStyle={{ padding: '0px!important'  }}
                style={{ width: '100%' }}
                hoverable={true}
            >
                <Content>
                    <Statistic title={`Selected Row${selectedRows.length === 1 ? '' : 's'}`} value={selectedRows.length} />
                    <Tiles>
                        <Popconfirm
                            title="Are you sure delete these items"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={onDelete}
                        >
                            <Tile>
                                <StyledIcon type="delete" />
                                <Text>Delete</Text>
                            </Tile>
                        </Popconfirm>
                        <Popover content={content}>
                            <Tile>
                                <StyledIcon type="right-circle" />
                                <Text>Move to</Text>
                            </Tile>
                        </Popover>
                        <StyledDivider type="vertical" />
                        <Tooltip title="Deselect items" placement="left">
                            <TileClose onClick={onDeselect}>
                                <StyledIcon type="close" />
                            </TileClose>
                        </Tooltip>
                    </Tiles>
                </Content>
            </Card>
        </Container>
    )
}

export default React.memo(BoardSelections);
