import React from 'react';
import { FlatList } from 'react-native';

const VirtualizedList = ({
    children,
    style,
    horizontal,
}: {
    children: React.ReactNode;
    style?: object;
    horizontal?: boolean;
}) => {
    return (
        <FlatList
            horizontal={horizontal}
            data={[]}
            contentContainerStyle={style}
            keyExtractor={() => 'key'}
            renderItem={null}
            ListHeaderComponent={<React.Fragment key={1}>{children}</React.Fragment>}
        />
    );
};

export default VirtualizedList;