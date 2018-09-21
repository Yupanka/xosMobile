import React from 'react';
import { shallow } from 'enzyme';
import Knock from './Knock';

describe('Knock', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Knock />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
