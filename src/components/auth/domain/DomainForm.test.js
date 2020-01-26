import React from 'react';
import { shallow, mount } from 'enzyme';
import DomainForm, { DForm } from './DomainForm';
import { Form } from 'antd';

/**
 * DomainForm
 */

it('should render full component when domain has been checked', () => {
    const wrapper = shallow(<DomainForm />);
    expect(wrapper).toMatchSnapshot();
});

it('should call crate domain with correct name', () => {
    const mockCheckDomain = jest.fn();
    const props = {
        onCheckDomain: mockCheckDomain
    }
    const wrapper = shallow(<DomainForm {...props} />);
    wrapper.props().children.props.onChange();

    expect(mockCheckDomain).toHaveBeenCalledTimes(1);
});

/**
 * DForm
 */
it('should render full component when domain has been checked', () => {
    let formRef;
    const EnhancedForm = Form.create()(DForm);
    const wrapper = mount(
        <EnhancedForm wrappedComponentRef={form => (formRef = form)} />
    );

    expect(wrapper).toMatchSnapshot();
});

it('should handle form submission when fields are valid', () => {
    const mockCreateDomain = jest.fn();
    let formRef;
    const EnhancedForm = Form.create()(DForm);
    const wrapper = mount(
        <EnhancedForm onCreateDomain={mockCreateDomain} wrappedComponentRef={form => (formRef = form)} />
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    const passwordInput = wrapper.find('input');
    passwordInput.instance().value = 'TestTeam';
    passwordInput.simulate('change');
    wrapper.find('form').simulate('submit', event);

    expect(mockCreateDomain).toHaveBeenCalledTimes(1);
});

it('should NOT handle form submission when fields are invalid', () => {
    const mockCreateDomain = jest.fn();
    let formRef;
    const EnhancedForm = Form.create()(DForm);
    const wrapper = mount(
        <EnhancedForm onCreateDomain={mockCreateDomain} wrappedComponentRef={form => (formRef = form)} />
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    wrapper.find('form').simulate('submit', event);

    expect(mockCreateDomain).toHaveBeenCalledTimes(0);
});
