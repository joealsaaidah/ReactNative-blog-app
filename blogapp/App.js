import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const data = [
  {
    id: "1",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643804380/blog-app/posts/RzvBHR6Wwl6mulZ.jpg",
    title: "First post",
    author: "mimicucu",
  },
  {
    id: "2",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643624554/blog-app/posts/vn45XSZ8S44sRvS.png",
    title: "Second post",
    author: "mimicucu",
  },
  {
    id: "3",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643607235/blog-app/posts/4IKAYjM7H69gX0r.jpg",
    title: "Third post",
    author: "mimicucu",
  },
  {
    id: "4",
    thumbnail:
      "https://res.cloudinary.com/mimicucu/image/upload/v1643607104/blog-app/posts/kPOHbimWcW3Ep5Z.jpg",
    title: "Forth post",
    author: "mimicucu",
  },
];

const width = Dimensions.get("window").width - 20;
let currentSlideIndex = 0;

export default function App() {
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22 }}>
          Featured Posts
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {data.map((item, index) => (
            <View
              key={item.id}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                borderWidth: 2,
                marginLeft: 4,
                backgroundColor:
                  activeSlideIndex === index ? "#383838" : "transparent",
              }}
            ></View>
          ))}
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
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width, height: width / 1.7, borderRadius: 7 }}
            />
          </View>
        )}
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
});
