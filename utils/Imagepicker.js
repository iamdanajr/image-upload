import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native';

export const lauchImagePicker = async () => {
    await checkPermissions();

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        quality: 1
    });

    if(!result.canceled){
        return result.assets[0].uri;
    }
}


const checkPermissions = async () =>{

    if(Platform.OS != 'web'){
        const userPermission = await ImagePicker.requestCameraPermissionsAsync();

        if(userPermission.granted == false){
            return new Promise.reject('We need permissions to select an image');
        }
    }

    return new Promise.resolve();

}