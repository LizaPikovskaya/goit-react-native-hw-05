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
import { CameraIcon, Location, Trash } from "../components/icons/Icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState("");
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaPermission(mediaPermission.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
      await MediaLibrary.createAssetAsync(uri);
    }
  };
  if (hasCameraPermission === null) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!hasCameraPermission) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text>No access to camera.</Text>
      </View>
    );
  }
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
              paddingBottom: isOpenKeyboard ? 55 : 34,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 32,
            },
          ]}
        >
          <View>
            {!photo ? (
              <Camera
                style={styles.photoWrapper}
                type={type}
                ref={setCameraRef}
              >
                <TouchableOpacity onPress={takePicture}>
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
                    <CameraIcon />
                  </View>
                </TouchableOpacity>
                <Image />
              </Camera>
            ) : (
              <View style={styles.photoWrapper}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            )}
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
                value={photoName}
                onChangeText={setPhotoName}
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
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => {
                navigation.navigate("Home", { screen: "Posts" });
              }}
            >
              <Text style={globalStyles.buttonText}>Опубліковати</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={()=> {setPhoto(null)}}>
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
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
