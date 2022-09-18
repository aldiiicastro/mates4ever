import React from "react"
import renderer from 'react-test-renderer';
import PetCard from "../Components/pets/PetCard";


test('renders correctly', () => {
    const tree = renderer.create(<PetCard pets={[]}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
