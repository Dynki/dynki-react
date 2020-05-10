import React from 'react';
import { mount } from 'enzyme';
import { Login, mapDispatchToProps, mapStateToProps } from './Login';
import { Form } from 'antd';
import { BrowserRouter, Redirect } from 'react-router-dom';

it('should render full component when domain has been checked', () => {
    const mockSignIn = jest.fn();

    const props = {
        SignIn: mockSignIn,
        auth: {
            uid: null
        }
    }

    let formRef;
    const EnhancedForm = Form.create()(Login);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm auth={props.auth} signIn={mockSignIn} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    expect(wrapper).toMatchSnapshot();
});

it('should handle form submission when fields are valid', () => {
    const mockSignIn = jest.fn();

    const props = {
        SignIn: mockSignIn,
        auth: {
            uid: null
        }
    }

    let formRef;
    const EnhancedForm = Form.create()(Login);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm auth={props.auth} signIn={mockSignIn} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    const test = jest.spyOn()

    const usernameInput = wrapper.find('input').at(0);
    usernameInput.instance().value = 'someone@somewhere.com';
    usernameInput.simulate('change');

    const passwordInput = wrapper.find('input').at(1);
    passwordInput.instance().value = 'password123';
    passwordInput.simulate('change');

    wrapper.find('form').simulate('submit', event);

    expect(mockSignIn).toHaveBeenCalledTimes(1);
});

it('should NOT handle form submission when fields are invalid', () => {
    const mockSignIn = jest.fn();

    const props = {
        SignIn: mockSignIn,
        auth: {
            uid: null
        }
    }

    let formRef;
    const EnhancedForm = Form.create()(Login);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm auth={props.auth} signIn={mockSignIn} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    const event = {
        preventDefault: jest.fn(),
        target: {}
    };

    wrapper.find('form').simulate('submit', event);

    expect(mockSignIn).toHaveBeenCalledTimes(0);
});

it('should REDIRECT when uid is defined', () => {
    const props = {
        auth: {
            uid: '12345'
        }
    }

    let formRef;
    const EnhancedForm = Form.create()(Login);
    const wrapper = mount(
        <BrowserRouter>
            <EnhancedForm auth={props.auth} wrappedComponentRef={form => (formRef = form)} />
        </BrowserRouter>
    );

    expect(wrapper.find(Redirect)).toHaveLength(1);
});

it('should set up state', () => {
    const initialState = {
        auth: { authError: null, pending: false },
        firebase: { auth: undefined },
        domain: { domainId: 'DOM123' }
    }
  
    expect(mapStateToProps(initialState).authError).toEqual(initialState.auth.authError);
    expect(mapStateToProps(initialState).pending).toEqual(initialState.auth.pending);
    expect(mapStateToProps(initialState).auth).toEqual(initialState.firebase.auth);
    expect(mapStateToProps(initialState).domain).toEqual(initialState.domain.domainId);
});

it('should set up dispatch', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).signIn();
    expect(dispatch).toHaveBeenCalledTimes(1);
});