import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    DCVBarcodeReader,
    DCVCameraView,
    EnumBarcodeFormat,
    EnumDBRPresetTemplate,
    EnumTorchState,
} from 'dynamsoft-capture-vision-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const option = {
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 0.7,
};

const mergeResultsText = (results) => {
    let str = '';
    if (results && results.length > 0) {
        for (let i = 0; i < results.length; i++) {
            str +=
                results[i].barcodeFormatString + ': ' + results[i].barcodeText + ' \n';
        }
    } else {
        str = 'No barcode detected.';
    }
    return str;
};

const BarcodeScanner = ({ navigation }) => {
    const [results, setResults] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [modalText, setModalText] = useState('');
    const scannerRef = useRef(null);
    const readerRef = useRef(null);
    let ifDecodingFile = false;

    const decodeFile = async (filePath) => {
        return readerRef.current.decodeFile(filePath);
    };

    const useImagePicker = (imagePickerLauncher) => {
        readerRef.current
            .updateRuntimeSettings(EnumDBRPresetTemplate.IMAGE_SPEED_FIRST)
            .catch((err) => {
                console.log(err);
            });
        ifDecodingFile = true;
        imagePickerLauncher(option, (res) => {
            if (res.didCancel) {
                ifDecodingFile = false;
                return false;
            }
            decodeFile(res.assets[0].uri.split('file://')[1])
                .then((decodedResults) => {
                    let str = mergeResultsText(decodedResults);
                    setIsVisible(true);
                    setModalText(str);
                })
                .catch((err) => {
                    console.log(err);
                    setIsVisible(true);
                    setModalText(err.toString());
                })
                .finally(() => {
                    initSettingForVideo(readerRef.current);
                    ifDecodingFile = false;
                });
        });
    };

    const initSettingForVideo = async () => {
        await readerRef.current.resetRuntimeSettings();
        let settings = await readerRef.current.getRuntimeSettings();

        settings.expectedBarcodesCount = 0;
        settings.barcodeFormatIds =
            EnumBarcodeFormat.BF_ONED |
            EnumBarcodeFormat.BF_QR_CODE |
            EnumBarcodeFormat.BF_PDF417 |
            EnumBarcodeFormat.BF_DATAMATRIX;

        await readerRef.current.updateRuntimeSettings(settings);
    };

    useEffect(() => {
        const setupBarcodeReader = async () => {
            readerRef.current = await DCVBarcodeReader.createInstance();

            await initSettingForVideo();

            readerRef.current.addResultListener((decodedResults) => {
                if (!ifDecodingFile) {
                    setResults(decodedResults);
                }
            });

            readerRef.current.startScanning();

            navigation.setOptions({
                headerRight: () => (
                    <View style={styles.headerRight}>
                        <Entypo
                            style={{ paddingRight: 15 }}
                            name={'camera'}
                            size={35}
                            onPress={() => {
                                useImagePicker(launchCamera);
                            }}
                        />
                        <Entypo
                            style={{ paddingLeft: 15 }}
                            name={'folder-images'}
                            size={35}
                            onPress={() => {
                                useImagePicker(launchImageLibrary);
                            }}
                        />
                    </View>
                ),
            });
        };

        setupBarcodeReader();

        return () => {
            readerRef.current.stopScanning();
            readerRef.current.removeAllResultListeners();
        };
    }, [navigation]);

    let barcodeText = '';
    let resultsArray = results;
    if (resultsArray && resultsArray.length > 0) {
        for (let i = 0; i < resultsArray.length; i++) {
            barcodeText +=
                resultsArray[i].barcodeFormatString +
                ':' +
                resultsArray[i].barcodeText +
                '\n';
        }
    }
console.log("9936562451",results);
    return (
        <DCVCameraView
            style={{
                flex: 1,
            }}
            ref={scannerRef}
            overlayVisible={true}
            torchButton={{
                visible: true,
            }}
            torchState={EnumTorchState.OFF}
        >
            <Text
                style={{
                    flex: 0.9,
                    marginTop: 200,
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 18,
                }}
            >
                {results && results?.length > 0 ? barcodeText : ''}
            </Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    setIsVisible(false);
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setIsVisible(false);
                    }}
                    style={styles.centeredView}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText}</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </DCVCameraView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: '#00000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        textAlign: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default BarcodeScanner;
