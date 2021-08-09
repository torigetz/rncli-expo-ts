
import React from 'react';
import { View } from 'react-native';
import { withLoading } from '../../components/withLoading';
import generateStyles from './styles';

export interface I__name__Screen {}

const __name__Screen: React.FC<I__name__Screen> = props => {
    const styles = generateStyles(props);

    return (
        <View>

        </View>
    );
}

const getData = async () => ({

})

export const __name__ = withLoading(getData)(__name__Screen);
