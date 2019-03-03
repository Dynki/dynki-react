import React from 'react';
import { shallow } from 'enzyme';
import { Board, mapDispatchToProps, mapStateToProps } from './Board';
import BoardHeader from './BoardHeader';

it('should render null when no boards', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find(BoardHeader)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
});

it('should render full component when boards are present', () => {
    const wrapper = shallow(<Board board={true}/>);
    expect(wrapper.find(BoardHeader)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
});

it('should call update board', () => {
    
})