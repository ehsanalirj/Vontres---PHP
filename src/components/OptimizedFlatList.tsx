import React, { memo } from 'react';
import { FlatList, FlatListProps } from 'react-native';

const OptimizedFlatList = memo((props: FlatListProps<any>) => {
  return (
    <FlatList
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={21}
      {...props}
    />
  );
});

export default OptimizedFlatList;