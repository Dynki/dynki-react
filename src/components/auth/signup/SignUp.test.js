import React from 'react';
import { mount } from 'enzyme';
import { SignUp, mapDispatchToProps, mapStateToProps } from './SignUp';
import { Form } from 'antd';
import { BrowserRouter, Redirect } from 'react-router-dom';

it('should render full component when domain has been checked', () => {
    const mockSignUp = jest.fn();

    let formRef;
    const EnhancedForm = Form.create()(SignUp);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm signUp={mockSignUp} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    expect(wrapper).toMatchSnapshot();
});

it('should handle form submission when fields are valid', () => {
    const mockSignUp = jest.fn();

    let formRef;
    const EnhancedForm = Form.create()(SignUp);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm signUp={mockSignUp} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    const usernameInput = wrapper.find('input').at(0);
    usernameInput.instance().value = 'someone@somewhere.com';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('input').at(1);
    passwordInput.instance().value = 'password123';
    passwordInput.simulate('change');

    wrapper.find('form').simulate('submit', event);

    expect(mockSignUp).toHaveBeenCalledTimes(1);
});

it('should NOT handle form submission when fields are invalid', () => {
    const mockSignUp = jest.fn();

    let formRef;
    const EnhancedForm = Form.create()(SignUp);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm signUp={mockSignUp} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    wrapper.find('form').simulate('submit', event);

    expect(mockSignUp).toHaveBeenCalledTimes(0);
});

it('should set up state', () => {
    const initialState = {
        auth: { authError: null, pending: false },
        firebase: { auth: undefined },
    }
  
    expect(mapStateToProps(initialState).authError).toEqual(initialState.auth.authError);
    expect(mapStateToProps(initialState).pending).toEqual(initialState.auth.pending);
    expect(mapStateToProps(initialState).auth).toEqual(initialState.firebase.auth);
});

it('should set up dispatch', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).signUp();
    expect(dispatch).toHaveBeenCalledTimes(1);
});