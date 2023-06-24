

// import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, } from "react-native";
import { Picker } from '@react-native-picker/picker';

import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import { AuthContext } from "../context/Provider";

const DonateMeal = () => {
    const { loading, setLoading } =
        useContext(AuthContext);
    // const navigation = useNavigation();

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [number, setNumber] = useState('');
    const [itemsValues, setItemsValues] = useState("");

    const handleNumberChange = (value) => {
        // Remove non-numeric characters
        const formattedValue = value.replace(/[^0-9]/g, '');
        setNumber(formattedValue);
    };

    const handleOptionChange = (value) => {
        setSelectedOptions(value);
    };

    const mealOptions = [
        { id: 1, label: 'Meal Type' },
        { id: 2, label: 'Meal2' },
        { id: 3, label: 'Meal3' },
    ];
    const quantityTypes = [

        { id: 2, label: 'Kg' },
        { id: 3, label: 'L' },
        { id: 4, label: 'Pcs ' },
    ];
    const orderOptions = [
        { id: 1, label: 'Drop or Pickup' },
        { id: 2, label: 'Drop' },
        { id: 3, label: 'Pickup' },
    ];



    const onDonateMeal = async () => {
        console.log("Donate meal screen")
    };

    if (loading) {
        return <Loading />;
    }
    return (
        < >
            <View style={styles.container}>
                <Text
                    style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 20 }}
                >
                    Donate
                </Text>

                <View style={{ flexDirection: 'row', gap: 3 }}>
                    {/* Item 1 */}
                    <View style={{ width: 150 }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Item 1
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Item1"
                            value={itemsValues}
                        />
                    </View>

                    {/* Meal options */}

                    <View style={{
                        width: 150,

                    }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Meal Type
                        </Text>
                        <View style={styles.inputText}>
                            <Picker
                                selectedValue={selectedOptions}
                                onValueChange={handleOptionChange}
                                mode="dropdown"
                                multiple={true}
                            >
                                {mealOptions.map((option) => (
                                    <Picker.Item key={option.id} label={option.label} value={option.id} />
                                ))}
                            </Picker>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    {/* Item 2 */}
                    <View style={{ width: 150 }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Item 2
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Item2"
                            value={itemsValues}
                        />
                    </View>


                    {/* Meal options */}
                    <View style={{
                        width: 150,

                    }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Meal Type
                        </Text>
                        <View style={styles.inputText}>
                            <Picker
                                selectedValue={selectedOptions}
                                onValueChange={handleOptionChange}
                                mode="dropdown"
                                multiple={true}
                            >
                                {mealOptions.map((option) => (
                                    <Picker.Item key={option.id} label={option.label} value={option.id} />
                                ))}
                            </Picker>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 3, marginTop: 50, }}>
                    {/* Item 2 */}
                    <View style={{ width: 150 }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Item Quantity
                        </Text>
                        <View style={{ width: 100 }}>
                            <TextInput
                                style={styles.inputText}
                                keyboardType="numeric"
                                placeholder="0"
                                value={number}
                                onChangeText={handleNumberChange}
                            />
                        </View>
                    </View>


                    {/* Item Quantity */}
                    <View style={{
                        width: 150,
                    }}>
                        <Text
                            style={{ fontFamily: "SemiBold", fontSize: 14 }}
                        >
                            Quantity Type
                        </Text>
                        <View style={styles.inputText}>
                            <Picker
                                selectedValue={selectedOptions}
                                onValueChange={handleOptionChange}
                                mode="dropdown"
                                multiple={true}
                            >
                                {quantityTypes.map((option) => (
                                    <Picker.Item key={option.id} label={option.label} value={option.id} />
                                ))}
                            </Picker>
                        </View>

                    </View>
                </View>

                {/* Order */}
                <View style={{
                    width: 300,
                    marginTop: 50,
                }}>
                    <Text
                        style={{ fontFamily: "SemiBold", fontSize: 14 }}
                    >
                        Order
                    </Text>
                    <View style={styles.inputText}>
                        <Picker
                            selectedValue={selectedOptions}
                            onValueChange={handleOptionChange}
                            mode="dropdown"
                            multiple={true}
                        >
                            {orderOptions.map((option) => (
                                <Picker.Item key={option.id} label={option.label} value={option.id} />
                            ))}
                        </Picker>
                    </View>

                </View>

                <CustomButton text="Continue" onPress={onDonateMeal} type="primary" />

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: "center",
        backgroundColor: "white",

    },
    button: {
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 150
    },
    inputText: {
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        height: 40,
    },
});


export default DonateMeal;
