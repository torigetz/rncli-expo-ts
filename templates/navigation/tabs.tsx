
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { tabRoutes } from './routes';

interface ITabs {};

const { Navigator, Screen } = createMaterialBottomTabNavigator();

export const Tabs: React.FC<ITabs> = props => {
    const generateRoutes = () => {
        let routes = [];

        for (let { name, title, Component, icon } of tabRoutes) {
            routes.push(
                <Screen
                    name={name}
                    key={name}
                    component={Component}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={icon}
                                color={color}
                                size={26}
                            />
                        ),
                        title: title
                    }}
                />
            );
        }

        return routes;
    }

    return (
        <Navigator
            shifting={false}
            labeled
        >
            {generateRoutes()}
        </Navigator>
    );
}
