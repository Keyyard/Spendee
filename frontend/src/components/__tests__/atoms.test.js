import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../atoms/interact/Button';
import { Input } from '../atoms/interact/Input';
import { Card } from '../atoms/layout/Card';
import { Section } from '../atoms/layout/Section';
import { Heading } from '../atoms/text/Heading';
import { BodyText } from '../atoms/text/BodyText';


describe('Atoms Components (renderer)', () => {
  it('renders Button', () => {
    const tree = renderer.create(<Button title="Test Button" onPress={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Input', () => {
    const tree = renderer.create(<Input placeholder="Type here" value="" onChangeText={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Card with children', () => {
    const tree = renderer.create(
      <Card><BodyText>Card Content</BodyText></Card>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Section with children', () => {
    const tree = renderer.create(
      <Section><BodyText>Section Content</BodyText></Section>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Heading at different levels', () => {
    const tree = renderer.create(
      <>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
      </>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders BodyText', () => {
    const tree = renderer.create(<BodyText>Body Content</BodyText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
