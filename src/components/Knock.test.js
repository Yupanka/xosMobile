import React from 'react';
import { shallow } from 'enzyme';
import Knock from './Knock';

describe('Knock', () => {
  it('renders as expected', () => {
    console.log('shallow');
    const wrapper = shallow(
      <Knock />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
