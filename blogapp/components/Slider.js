import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;
let intervalId;

export default function Slider({ data, title }) {
  const [dataToRender, setDataToRender] = useState([]);
  const [visibleSlideIndex, setVisibleSlideIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const flatList = useRef();
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    currentSlideIndex = viewableItems[0]?.index || 0;
    setVisibleSlideIndex(currentSlideIndex);
  });

  const scrollHandler = (index) => {
    flatList.current.scrollToIndex({ animated: false, index });
  };

  const startSlider = () => {
    if (currentSlideIndex <= dataToRender.length - 2) {
      intervalId = setInterval(() => {
        flatList.current.scrollToIndex({
          animated: true,
          index: currentSlideIndex + 1,
        });
      }, 4000);
    } else {
      pauseSlider();
    }
  };
  const pauseSlider = () => {
    clearInterval(intervalId);
  };

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item.thumbnail }} style={styles.slideImage} />
      <View style={{ width }}>
        <Text
          numberOfLines={2}
          style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    const newData = [[...data].pop(), ...data, [...data].shift()];
    setDataToRender([...newData]);
  }, [data.length]);

  useEffect(() => {
    const length = dataToRender.length;
    //  reset slide to first
    if (visibleSlideIndex === length - 1 && dataToRender.length)
      scrollHandler(1);

    // reset slide to last
    if (visibleSlideIndex === 0 && length) scrollHandler(length - 2);

    const lastSlide = currentSlideIndex === length - 1;
    const firstSlide = currentSlideIndex === 0;
    if (lastSlide && length) setActiveSlideIndex(0);
    else if (firstSlide && length) setActiveSlideIndex(length - 2);
    else setActiveSlideIndex(currentSlideIndex - 1);
  }, [visibleSlideIndex]);

  useEffect(() => {
    if (dataToRender.length && flatList.current) {
      startSlider();
    }
  }, [dataToRender.length]);

  return (
    <View style={styles.container}>
      <View style={styles.slideHead}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.slideIndecatorContainer}>
          <SlideIndicator data={data} activeSlideIndex={activeSlideIndex} />
        </View>
      </View>
      <FlatList
        ref={flatList}
        data={dataToRender}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        onScrollBeginDrag={pauseSlider}
        onScrollEndDrag={startSlider}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width,
    paddingTop: 50,
  },
  slideHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  title: { fontWeight: "700", color: "#383838", fontSize: 22 },
  slideIndecatorContainer: { flexDirection: "row", alignItems: "center" },
  slides: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginLeft: 4,
  },
  slideImage: {
    width,
    height: width / 1.7,
    borderRadius: 7,
  },
});

const SlideIndicator = ({ data, activeSlideIndex }) =>
  data.map((item, index) => (
    <View
      key={item.id}
      style={[
        styles.slides,
        {
          backgroundColor:
            activeSlideIndex === index ? "#383838" : "transparent",
        },
      ]}
    />
  ));
