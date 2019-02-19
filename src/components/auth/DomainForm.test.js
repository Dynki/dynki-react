import React from 'react';
import { shallow } from 'enzyme';
import DomainForm from './DomainForm';

it('should render full component when domain has been checked', () => {
    const wrapper = shallow(<DomainForm />);
    expect(wrapper).toMatchSnapshot();
});

it('should call crate domain with correct name', () => {
    const mockCheckDomain = jest.fn();
    const props = {
        onCheckDomain: mockCheckDomain
    }
    const wrapper = shallow(<DomainForm {...props}/>);

    wrapper.props().children.props.onChange();

    expect(mockCheckDomain).toHaveBeenCalledTimes(1);
});
