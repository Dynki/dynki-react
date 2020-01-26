import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { checkVAT, countries } from 'jsvat';
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import styles from 'styled-components';

import Terms from '../Terms';
import Privacy from '../Privacy';

const FormItem = Form.Item;
const { Option } = Select;

const PasswordCriteria = styles.div`
    padding-left: 15px;
`;

const StyledForm = styles.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    min-height: 378px;
    background-color: #ffffff;
    padding: 36px!important;
    width: 100%;
    height: 600px;

    .heading {
        color:  #3095de;;
        // font-family: Raleway;
        font-size: 37px;
        margin-bottom: 20px;
    }

    nz-form-item {
        width: 100%;
    }

    form {
        min-width: 100%;
    }

    .button {
        height: 73px;
        font-size: 35px;
        width: 100%;
    
        span {
            padding-right: 30px;
        }
    }
`;

const StyledSelect = styles(Select)`
    margin-top: 20px;
`;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


const SignUpForm = ({ countryCodes, form, location, pending, signUp }) => {

    const countriesDOM = countryCodes.map(c => <Option key={c['alpha-2']}>{c.name}</Option>)

    const splitPackageName = location.pathname.split('/')[3];
    const packageName = splitPackageName ? splitPackageName : 'personal';

    const [numberSuccess, setNumberSuccess] = useState('red');
    const [mixedSuccess, setMixedSuccess] = useState('red');
    const [specialSuccess, setSpecialSuccess] = useState('red');
    const [agreeFailed, setAgreeFailed] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        form.validateFields(async (err, values) => {
            if (!values.agree) {
                setAgreeFailed(true);
            } else {
                if (!err) {
                    signUp(values, packageName, values.country, selectedCountry.region, values.VATNumber);
                }
            }
        });
    }

    const onSetCountry = value => {
        const country = countryCodes.find(c => c['alpha-2'] === value);
        setSelectedCountry(country);
    }

    const validatePassword = (rule, value, callback) => {
        const password = value ? value : '';

        const hasNumber = value => {
            return new RegExp(/[0-9]/).test(value);
        }
        const hasMixed = value => {
            return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
        }
        const hasSpecial = value => {
            return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
        }

        setSpecialSuccess(hasSpecial(password) ? '#52C41A' : 'red');
        setMixedSuccess(hasMixed(password) ? '#52C41A' : 'red');
        setNumberSuccess(hasNumber(password) ? '#52C41A' : 'red');

        if (!password) {
            callback();
        } else if (password.length > 0 && password.length < 8) {
            callback('Must be longer than 8 characters');
        } else if (hasNumber(password) && hasMixed(password) && hasSpecial(password)) {
            callback();
        } else if (!hasNumber(password)) {
            callback('Must contain a number');

        } else if (!hasMixed(password)) {
            callback('Must contain upper and lower case letters');

        } else if (!hasSpecial(password)) {
            callback('Must contain at least one special character');
        }
    } 

    const validateVATNumber = (rule, value, callback) => {
        const hasSpaces = value => {
            return new RegExp(/[ ]/).test(value);
        }

        const hasValidFirstTwoCharacters = value => {
            return new RegExp(/[A-z,a-z]{2}/).test(value);
        }

        if (hasSpaces(value)) {
            callback('Cannot contain spaces');
        }

        if (!hasValidFirstTwoCharacters(value)) {
            callback('Must contain a valid VAT number prefix, e.g. GB');
        }

        if (value === undefined || value === null || value === '') {
            callback();
        } else {
            const check = checkVAT(value, countries);
            check.isValid ? callback() : callback('Not a valid VAT number');
        }
    }

    const { getFieldDecorator, getFieldsError } = form;

    return (
        <Fragment>
            <StyledForm>
                <h1 className="heading">Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [
                                { required: true, message: 'Please input an email!' },
                                { type: 'email', message: 'Not a valid email address!' }
                        ],
                        })(
                            <Input disabled={pending} autoFocus size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                        )}
                        
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input a Password!' },
                                { validator: (rule, value, callback) => validatePassword(rule, value, callback) }
                            ],
                        })(
                            <Input disabled={pending} size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <PasswordCriteria><Icon type="check" style={{ color: numberSuccess }}/> Contains a number</PasswordCriteria>
                    <PasswordCriteria><Icon type="check" style={{ color: mixedSuccess }}/> Contains upper case and lower case</PasswordCriteria>
                    <PasswordCriteria><Icon type="check" style={{ color: specialSuccess }}/> Contains a special character</PasswordCriteria>
                    <FormItem>
                        {getFieldDecorator('country', {
                            valuePropName: 'country',
                            initialValue: '',
                            rules: [
                                { required: true, message: 'Please select a country' },
                            ],
                        })(
                            <StyledSelect
                                showSearch
                                disabled={pending}
                                size="large"
                                placeholder="Select a country"
                                optionFilterProp="children"
                                onChange={onSetCountry}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {countriesDOM}
                            </StyledSelect>
                        )}
                    </FormItem>
                    {selectedCountry && selectedCountry.region === 'Europe' ?
                        <FormItem>
                            {getFieldDecorator('VATNumber', {
                                rules: [
                                    { validator: (rule, value, callback) => validateVATNumber(rule, value, callback) }
                                ],
                            })(
                                <Input disabled={pending} autoFocus size="large" prefix={<Icon type="audit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="VAT Number (Optional)" />
                            )}
                            
                        </FormItem>
                        : null
                    }


                    <FormItem>
                        {getFieldDecorator('agree', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: [
                                { required: true, message: 'Please agree terms!' },
                            ],
                        })(
                            <Checkbox disabled={pending} className={agreeFailed ? 'signup-agree--failed': ''}>{agreeFailed ? 'Please agree to ' : 'I agree to the '}
                                <Terms/>
                                <span> and </span>
                                <Privacy/>
                            </Checkbox>
                        )}
                        <Button id="btnRegister" disabled={hasErrors(getFieldsError())} type="dashed" htmlType="submit" className="button" loading={pending}>
                            Go
                            <Icon type="check" />
                        </Button>
                        Or <Link id="backToLogin" to="/auth/login">go to login</Link>
                    </FormItem>

                </Form>
            </StyledForm>
        </Fragment>
    );
}

export const SignUp = withRouter(Form.create()(SignUpForm));
export default SignUp;