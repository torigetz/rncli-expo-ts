

import React, { useState } from "react";
import { useEffect } from "react";

interface IWithLoading {
    childProps: any,
    Component: React.FC<any>,
    navigation: any
}

export const createLoader = (Loader: React.FC) => (resource: any) => {    
    return (Component: React.FC<any>) => {
        const WithLoading: React.FC<IWithLoading> = props => {
            const [ loading, setLoading ] = useState<boolean>(true);
            const [ data, setData ] = useState<any>({});

            useEffect(() => {
                const focusUnsubscribe = props.navigation.addListener('focus', async () => {
                    console.log(`[withLoading] - ${Component.name} updating`);

                    const downloadedData = await resource(props);
                    await setData(downloadedData);

                    setLoading(false);
                });

                const blurUnsibscribe = props.navigation.addListener('blur', async () => {
                    console.log(`[withLoading] - ${Component.name} blured`);
                    setLoading(true);
                })


                return () => {
                    focusUnsubscribe();
                    blurUnsibscribe();
                };
            }, []);

            const updateData = async () => {
                const newData = await resource();
                setData(data);
            }

            if (loading) {
                return (
                    <Loader />
                );
            }

            return (
                <Component
                    {...props}
                    data={data}
                    updateData={updateData}
                />
            );
        }

        return WithLoading;
    }
}
