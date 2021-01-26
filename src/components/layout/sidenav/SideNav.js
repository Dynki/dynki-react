import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import styled from 'styled-components'

import { Divider } from 'antd'

import DynMenu from '../menu/Menu'
import SideNavBreadCrumb from './SideNavBreadCrumb'
import authWrapper from '../../auth/AuthWrapper'

import { getBoards, getBoard, newBoard } from '../../../store/actions/boardActions'
// import { getChannels, getChannel, newChannel } from '../../../store/actions/channelActions'; 
import { setDomain } from '../../../store/actions/authActions'
import { getTeam } from '../../../store/actions/teamActions'

const StyledSideNav = styled.div`
    height: 100%;
    border-right: 1px solid #e8e8e8;
    position: fixed;
    top: 65px;

    .ant-menu {
        .ant-menu-item {
            padding-left: 16px!important;

            &:hover {
                background-color: #e6f7ff;
                color: rgba(0, 0, 0, 0.65);
            } 
        }
    }

    i {
        font-size: 18px!important;
    }
`

const SideNav = ({
  boards,
  getBoards,
  history,
  hideHome,
  isActiveSubscriber,
  selectedKeys,
  team,
  teams,
  setDomain,
  getTeam
}) => {

  const [loadingTeam, setLoadingTeam] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    getBoards()
  }, [])

  useEffect(() => {
    initialiseMenuItems()
  }, [boards])

  const initialiseMenuItems = () => {
    const constructItems = (itemArr) => {
      return itemArr.map(i => ({
        id: i.id,
        title: i.title,
        target: `/board/${i.id}`,
        action: () => loadBoard(i.id),
        isFolder: i.isFolder,
        items: i.items ? constructItems(i.items) : null
      }))
    }

    let items = []
    if (boards) {
      items = constructItems(boards)
    }

    // const constructChannelItems = (itemArr) => {
    //     return itemArr.map(i => ({
    //         id: i.id,
    //         title: '# ' + i.title,
    //         target: `/channel/${i.id}`,
    //         action: () => this.loadChannel(i.id),
    //     }));
    // }
    // let channelItems = [];
    // if (this.props.channels) {
    //     channelItems = constructChannelItems(this.props.channels);
    // }

    const menuItems = [
      { key: 1, title: 'Channels', icon: 'MessageOutlined', live: false },
      // { key: 1, title: 'Channels', icon: 'message', action: newChannel(), live: true, items: channelItems, tooltip: 'New channel' },
      { key: 2, title: 'Boards', icon: 'ScheduleOutlined', action: newBoard(), live: true, items: items, tooltip: 'New board' },
      { key: 3, title: 'Projects', icon: 'RocketOutlined', live: false },
      { key: 4, title: 'Tags', icon: 'TagsOutlined', live: false }
    ]

    setMenuItems(menuItems)
  }

  const loadBoard = (id) => {
    history.push('/board/' + id)
    getBoard(id)
  }

  const handleMenuClick = async (e) => {
    setLoadingTeam(true)

    await setDomain(e.key)
    await getTeam(e.key)
    await getBoards()
    // this.props.getChannels();
    setLoadingTeam(false)

    if (boards && boards.length > 0) {
      loadBoard(boards[0].id)
    }
  }

  const handleButtonClick = () => {
    history.push(`/team/${team.id}`)
  }

  const teamName = team ? team.display_name : ''
  const loading = !team || loadingTeam ? true : false

  return (
    <StyledSideNav>
      <SideNavBreadCrumb
        hideHome={hideHome}
        loading={loading}
        teamName={teamName}
        teams={teams}
        selectTeam={handleMenuClick}
        displayTeam={handleButtonClick}
        isActiveSubscriber={isActiveSubscriber}
      />
      <Divider dashed={true} style={{ margin: '0px', marginTop: '4px' }} />
      {boards ?
        <DynMenu
          loadingBoards={loading}
          menu={menuItems}
          selectedKeys={selectedKeys}
        />
        :
        null
      }
    </StyledSideNav>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedKeys: state.boards.currentBoard ? [state.boards.currentBoard.id] : [],
    domainName: state.domain.name,
    boards: state.boards.boards,
    //   channels: state.channel.channels,
    teams: state.teams.teams,
    team: state.teams.currentTeam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTeam: (id) => dispatch(getTeam(id)),
    getBoards: () => dispatch(getBoards()),
    getBoard: (id) => dispatch(getBoard(id)),
    // getChannels: () => dispatch(getChannels()),
    // getChannel: (id) => dispatch(getChannel(id)),
    newBoard: () => dispatch(newBoard()),
    setDomain: (id) => dispatch(setDomain(id)),
  }
}

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(authWrapper(SideNav)))
