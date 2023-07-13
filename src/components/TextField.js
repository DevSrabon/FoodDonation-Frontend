import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Text, Animated } from 'react-native';
const defaultColors = {
    placeHolder: "black",
    colorTheme: "#B9C4CA",
    errorColor: "red"
}
const TextField = ({
    Placeholder = "email",
    colorTheme,
    value="email value",
    isError,
    errorMessgae,
    placeHolderColor = "red",
    onChangeText,
    style,
    inputStyles,
    ...restOfProps }) => {
    const inputref = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const focusAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start()
    }, [focusAnim, isFocused])
    return (
        <View style={{ marginTop: 50 }}>
            <TextInput
                style={[styles.input, inputStyles, {
                    // borderColor: isFocused                                               // focusable styles
                    //     ? colorTheme
                    //         ? colorTheme
                    //         : defaultColors.colorTheme
                    //     : defaultColors.colorTheme
                    borderColor: isError ? defaultColors.errorColor : colorTheme ? colorTheme : defaultColors.colorTheme         // default styles
                }]}
                onChangeText={onChangeText}
                ref={inputref}
                onBlur={() => { setIsFocused(false) }}
                onFocus={() => { setIsFocused(true) }}
                {...restOfProps} />
            <Animated.View style={[styles.labelContainer,
            {
                top: value
                    ? -9
                    : focusAnim.interpolate({ inputRange: [0, 1], outputRange: [13, -9], }),
            },]}>
                <Animated.Text
                    onPress={() => inputref.current.focus()}
                    style={[styles.label,
                    {
                        fontSize: value ? -14 : focusAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 14], }),
                        color: isError
                            ? defaultColors.errorColor
                            : value
                                ? colorTheme
                                    ? colorTheme
                                    : defaultColors.placeHolder
                                : isFocused
                                    ? colorTheme
                                        ? colorTheme
                                        : defaultColors.placeHolder
                                    : placeHolderColor
                                        ? placeHolderColor
                                        : defaultColors.placeHolder,
                    },]}>
                    {Placeholder}
                </Animated.Text>
            </Animated.View>
            {isError && <Text style={styles.errorMessage}>{errorMessgae}*</Text>}
        </View>
    )
}

export default TextField;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        fontFamily: "SemiBold",
        fontSize: 16,
    },
    labelContainer: {
        position: 'absolute',
        left: 16,
        paddingHorizontal: 5,
        backgroundColor: 'white',
    },
    label: {
        fontFamily: "SemiBold",
        fontSize: 12,
    },
    errorMessage: {
        fontSize: 11,
        color: defaultColors.errorColor
    }
})