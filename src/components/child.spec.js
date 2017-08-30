import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Child from './child';

describe('test child', () => {
	test('test child render', () => {
		const wrapper = shallow(<Child />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})