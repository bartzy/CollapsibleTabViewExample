import React, { useCallback, useState, useRef } from "react";
import { SafeAreaView, Dimensions, View, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { TabView, TabBar } from "react-native-tab-view";
import ExampleHeader from "./ExampleHeader";
import ExampleTab from "./ExampleTab";

const initialLayout = { width: Dimensions.get("window").width };

const HEADER_HEIGHT = 50;
const TABBAR_HEIGHT = 48;
const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + TABBAR_HEIGHT;

const App: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(
    scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: Animated.Extrapolate.CLAMP
    })
  ).current;
  const headerOpacity = useRef(
    scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [1, 0],
      extrapolate: Animated.Extrapolate.CLAMP
    })
  ).current;

  const [index, setIndex] = useState(0);
  const routes = [
    {
      key: "Tab 1",
      title: "Tab 1"
    },
    { key: "Tab 2", title: "Tab 2" }
  ];

  const [listRefs] = useState(() => {
    const refs: { [key: string]: React.RefObject<FlatList<any>> } = {};
    for (const route of routes) {
      refs[route.key] = React.createRef();
    }
    return refs;
  });

  const renderScene = useCallback(({ route }) => {
    return (
      <ExampleTab
        ref={listRefs[route.key]}
        scrollContentContainerStyle={{ paddingTop: TOTAL_HEADER_HEIGHT }}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      />
    );
  }, []);

  const handleTabChange = () => {
    listRefs["Tab 2"].current.getNode().scrollToOffset({
      offset: 50,
      animated: false
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "rgb(239, 243, 252)" }}>
        <ExampleHeader
          style={{
            position: "absolute",
            height: HEADER_HEIGHT,
            opacity: headerOpacity,
            transform: [{ translateY: headerTranslateY }],
            zIndex: 1
          }}
        />

        <TabView
          onSwipeStart={() => console.log(`swipe start (index = ${index})`)}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={props => (
            <Animated.View
              style={{
                position: "absolute",
                top: HEADER_HEIGHT,
                left: 0,
                right: 0,
                zIndex: 1,
                transform: [{ translateY: headerTranslateY }],
                backgroundColor: "rgb(239, 243, 252)"
              }}
            >
              <TabBar {...props} onTabPress={() => handleTabChange()} />
            </Animated.View>
          )}
          initialLayout={initialLayout}
          onIndexChange={setIndex}
          style={{ overflow: "visible" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
