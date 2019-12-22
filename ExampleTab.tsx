import React, { useCallback } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle,
  ListRenderItem,
  Text,
  View
} from "react-native";
import Animated from "react-native-reanimated";

const ITEM_MARGIN_BOTTOM = 10;
const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;

const Item: React.FC<{ number: number }> = React.memo(({ number }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      marginBottom: ITEM_MARGIN_BOTTOM,
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      backgroundColor: `rgb(${Math.round(Math.random() * 256)}, ${Math.round(
        Math.random() * 256
      )}, ${Math.round(Math.random() * 256)})`
    }}
  >
    <Text>{number}</Text>
  </View>
));

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface ExampleTabProps {
  scrollContentContainerStyle?: StyleProp<ViewStyle>;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const fakeData = Array.from(Array(100).keys());

const ExampleTab: React.FC<ExampleTabProps> = React.memo(
  ({ scrollContentContainerStyle, onScroll }) => {
    const renderItem: ListRenderItem<number> = useCallback(info => {
      return <Item number={info.item} />;
    }, []);

    const getItemSize = (data: number[], index: number) => ({
      length: ITEM_HEIGHT,
      offset: (ITEM_HEIGHT + ITEM_MARGIN_BOTTOM) * index,
      index: index
    });

    return (
      <AnimatedFlatList
        data={fakeData}
        renderItem={renderItem}
        getItemLayout={getItemSize}
        keyExtractor={keyExtractor}
        scrollEventThrottle={1}
        onScroll={onScroll}
        contentContainerStyle={[{}, scrollContentContainerStyle]}
      />
    );
  }
);

function keyExtractor(item: any, index: number): string {
  return index.toString();
}

export default ExampleTab;
