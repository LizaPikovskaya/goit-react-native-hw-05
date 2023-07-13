import { Image, StyleSheet, Text } from "react-native";
import TabNavigation, { FocusedIcon } from "../components/TabNavigation";
import { View, ScrollView } from "react-native";
import { globalStyles } from "../globalStyles";
import { Comments, Location } from "../components/icons/Icons";
import Post from "../components/Post";
export const PostsScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={[
          globalStyles.container,
          {
            flexDirection: "column",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 32,
          },
        ]}
      >
        <View style={{ gap: 8, flexDirection: "row", marginBottom: 32 }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#F6F6F6",
              borderRadius: 16,
            }}
          >
            <Image source={require("../assets/images/user.png")} />
          </View>
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                lineHeight: 15.23,
                fontSize: 13,
              }}
            >
              Natali Romanova
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                lineHeight: 12.89,
                fontSize: 11,
                color: "#212121CC",
              }}
            >
              email@example.com
            </Text>
          </View>
        </View>
        <Post
          way={require("../assets/images/sky.jpg")}
          name={"Ліс"}
          commentsNumber={0}
          country={"Ivano-Frankivs'k Region, Ukraine"}
        />
        <Post
          way={require("../assets/images/sunset.jpg")}
          name={"Захід на Чорному морі"}
          commentsNumber={0}
          country={"Ukraine"}
        />
        <Post
          way={require("../assets/images/house.jpg")}
          name={"Захід на Чорному морі"}
          commentsNumber={0}
          country={"Ukraine"}
        />
      </View>
    </ScrollView>
  );
};
