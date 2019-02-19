import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Root from './root';

const mockStore = configureStore();

it('should render full component when domain has been checked', () => {
  const store = mockStore({});
  const wrapper = shallow(<Root store={store} />);
  expect(wrapper).toMatchSnapshot();
});

