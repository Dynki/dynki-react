import React from 'react';
import { shallow } from 'enzyme';
import { Domain, mapDispatchToProps, mapStateToProps } from './Domain';

it('should render full component when domain has been checked', () => {
    const wrapper = shallow(<Domain />);
    expect(wrapper).toMatchSnapshot();
});

it('should call check domain with correct name', done => {

    const mockCheckDomain = jest.fn();
    const wrapper = shallow(<Domain CheckDomain={mockCheckDomain}/>);
    wrapper.instance().onCheckDomain('TestName');

    setTimeout(() => {
        expect(wrapper.instance().props.CheckDomain).toHaveBeenCalledTimes(1);
        done();
    }, 1000);
});

it('should call crate domain with correct name', () => {
    const mockCreateDomain = jest.fn();
    const wrapper = shallow(<Domain CreateDomain={mockCreateDomain}/>);
    wrapper.instance().onCreateDomain('TestName');
    expect(wrapper.instance().props.CreateDomain).toHaveBeenCalledTimes(1);
});

it('should set up state', () => {
    const initialState = {
        auth: { authError: null, pending: false },
        firebase: { auth: undefined },
        domain: 'DOM123'
    }
  
    expect(mapStateToProps(initialState).authError).toEqual(initialState.auth.authError);
    expect(mapStateToProps(initialState).pending).toEqual(initialState.auth.pending);
    expect(mapStateToProps(initialState).auth).toEqual(initialState.firebase.auth);
    expect(mapStateToProps(initialState).domain).toEqual(initialState.domain);
});

it('should set up dispatch', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).CheckDomain();
    mapDispatchToProps(dispatch).CreateDomain();
    expect(dispatch).toHaveBeenCalledTimes(2);
});