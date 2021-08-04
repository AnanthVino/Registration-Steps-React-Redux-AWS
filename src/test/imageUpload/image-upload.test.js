/**
 * 
 * Code implementation
 * @Author Ananth Gunasekarapandiyan
 * @Email ananth1626p@gmail.com
 * 
 */

 import React from 'react';
 import { configure, shallow } from 'enzyme';
 import Adapter from 'enzyme-adapter-react-16';
 import toJson from 'enzyme-to-json';
 import ImageUpload from '../../components/imageUpload';
 import configureMockStore from "redux-mock-store";
 
 configure({ adapter: new Adapter() })
 
 const mockStore = configureMockStore();
 
 const data = { personal: {}};
 
 const initialState = {
     data: data
 };
 
 describe('render image upload', () => {
     it('should render correctly', () => {
         let locationMock = { pathname: jest.fn() };
         let store = mockStore(initialState);
         let wrapper = shallow(<ImageUpload store={store} location={locationMock}/>).childAt(0).dive()
         expect(toJson(wrapper)).toMatchSnapshot()
     })
 })