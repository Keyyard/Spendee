import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

describe('Demo Text Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Text>Hello, Spendee!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
