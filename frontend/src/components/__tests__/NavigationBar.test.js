jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

import * as React from 'react';
import renderer from 'react-test-renderer';
import NavigationBar from '../navigation/NavigationBar';

describe('NavigationBar', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(<NavigationBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
