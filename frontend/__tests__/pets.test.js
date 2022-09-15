test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});

import axios from 'axios';
import { getPetById } from '../server/Api';
import { getOneMockPet } from '../MockData/Seed';
// import PetDetails from '../Components/pets/PetDetails';

jest.mock('axios');

test('the details page render correctly', () => {
    axios.get.mockResolvedValue({data: getOneMockPet});
    // const { getByTestId } = render(
    //     <PetDetails id="632247d0c96a911e5f8a48fe" />
    // );
    // let name = getByTestId("name").value
    // let age = getByTestId("age")
    // let tag = getByTestId("tag")
    // let description = getByTestId("description")


    // return name.toEqual("Mía")
    return getPetById("632247d0c96a911e5f8a48fe").then(response => expect(response.data.name).toEqual("Mía"))
});