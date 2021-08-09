
import React from 'react';
import { View, Text } from 'react-native';
import generateStyles from './styles';

export interface ILoader {}

export const Loader: React.FC<ILoader> = props => {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}
