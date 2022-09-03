import * as React from 'react';
import {StyleSheet, ScrollView,} from 'react-native';
import PetCard from "./PetCard";

export default function Pets() {
    return (
        <ScrollView>
            <PetCard />
        </ScrollView>
    );
}

