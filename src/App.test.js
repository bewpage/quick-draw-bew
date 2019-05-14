import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { MemoryRouter } from "react-router-dom";
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Round from './Round';
import Game from './Game';
import HeaderGame from './HeaderGame';
import Controls from './Controls';
import Timer from './TimerClass';

// reseting className counter in Material-UI for snapshot
const generateClassName = (rule, styleSheet) =>
    `${styleSheet.options.classNamePrefix}-${rule.key}`;

// create canvas node element for tests
const createNodeMock = (element) => {
  if(element.type === 'canvas'){
     return (
         <canvas width={300} height={300}/>
     )
  }
  return null;
};

const TestHook = ({ callback }) => {
    callback();
    return null;
};

const testHook = (callback) => {
    mount(<TestHook callback={callback}/>)
};


describe('<Timer />',  () => {
   it('renders correctly', () => {
      const tree = renderer.create(<Timer />).toJSON();
      expect(tree).toMatchSnapshot();
   })
});

describe('<Controls />',  () => {
   it('renders correctly with refs', () => {
      const option = {createNodeMock};
      const tree = renderer.create(
          <JssProvider generateClassName={generateClassName}>
              <Controls />
          </JssProvider>, option).toJSON();
      expect(tree).toMatchSnapshot();
   });
});

describe('<Game />', () => {
    const wrapper = mount(
        <MemoryRouter>
            <Game>
                <Round/>
            </Game>
        </MemoryRouter>);

    it('Game component contains GameHeader', () => {
        expect(wrapper.contains(<HeaderGame />)).toEqual(true);
    });


    it('timer is not render', () => {
       expect(wrapper.contains(<Timer />)).toEqual(false);
    });

    it('Round is not render', () => {
        expect(wrapper.contains(<Round />)).toEqual(false);
    });
});
