import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps, mapStateToProps } from './App';

const mockOnSetDomainFn = jest.fn();

it('should render full component when domain has been checked', () => {
  const wrapper = shallow(<App SetDomain={mockOnSetDomainFn} domainChecked={true}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should render null when domain not checked', () => {
  const wrapper = shallow(<App SetDomain={mockOnSetDomainFn} domainChecked={false}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should set up state', () => {
  const initialState = {
    firebase: { auth: '1234' },
    domain: { domainId: 'ABC', domainChecked: true },
  }

  expect(mapStateToProps(initialState).auth).toEqual('1234');
  expect(mapStateToProps(initialState).domain).toEqual('ABC');
  expect(mapStateToProps(initialState).domainChecked).toEqual(true);
});

it('should set up dispatch', () => {
  const dispatch = jest.fn();

  mapDispatchToProps(dispatch).SetDomain();
  expect(dispatch).toBeCalled();
});