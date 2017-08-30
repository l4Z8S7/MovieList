import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import nock from 'nock';
import App from './App';

describe('test app', () => {
	test('test app render', () => {
		const wrapper = shallow(<App />);
		expect(toJson(wrapper)).toMatchSnapshot();
	})
})