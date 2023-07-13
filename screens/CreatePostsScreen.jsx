import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Platform,
} from "react-native";
import { Text } from "react-native";
import { globalStyles } from "../globalStyles";
import { Image } from "react-native";
import { Camera, Location, Trash } from "../components/icons/Icons";
import { useState } from "react";

export const CreatePostsScreen = () => {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            globalStyles.container,
            {
              justifyContent: "flex-end",
              paddingBottom: isOpenKeyboard? 55: 34,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 32,
            },
          ]}
        >
          <View>
            <View style={styles.photoWrapper}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Camera />
              </View>
              <Image />
            </View>
            <Text style={styles.text}>Завантажте фото</Text>
            <View>
              <TextInput
                style={[
                  styles.input,
                  { height: 50, fontFamily: "Roboto-Medium" },
                ]}
                placeholder="Назва..."
                onFocus={() => setIsOpenKeyboard(true)}
                onBlur={() => setIsOpenKeyboard(false)}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  borderBottomWidth: 1,
                  borderColor: "#E8E8E8",
                  height: 50,
                  marginBottom: 32,
                }}
              >
                <Location />
                <TextInput
                  style={[
                    styles.input,
                    {
                      flex: 1,
                      borderBottomWidth: 0,
                      marginBottom: 0,
                      fontFamily: "Roboto-Regular",
                    },
                  ]}
                  placeholder="Місцевість..."
                  onFocus={() => setIsOpenKeyboard(true)}
                  onBlur={() => setIsOpenKeyboard(false)}
                />
              </View>
            </View>
            <TouchableOpacity style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <View
              style={{
                // position: "absolute",
                // bottom: 0,
                width: 70,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F6F6F6",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Trash />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  photoWrapper: {
    with: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    fontSize: 16,
    marginBottom: 16,
  },
});
