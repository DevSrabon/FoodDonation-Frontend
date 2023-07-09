import React from 'react';
import { Modal, View, Text, TouchableOpacity ,StyleSheet} from 'react-native';

const CustomAlert = ({ visible, type, title, message, onClose }) => {
    let backgroundColor, borderColor, titleColor;
  
    // Define styles based on the alert type
    if (type === 'cancel') {
      backgroundColor = 'gray';
      borderColor = 'darkgray';
      titleColor = 'white';
    } else if (type === 'success') {
      backgroundColor = 'green';
      borderColor = 'darkgreen';
      titleColor = 'white';
    } else if (type === 'danger') {
      backgroundColor = 'red';
      borderColor = 'darkred';
      titleColor = 'white';
    } else {
      // Default styles for unknown type
      backgroundColor = 'lightgray';
      borderColor = 'gray';
      titleColor = 'black';
    }
  
    return (
      <Modal visible={visible} transparent>
        <View style={[styles.container, { backgroundColor }]}>
          <View style={[styles.content, { borderColor }]}>
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      borderWidth: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  export default CustomAlert;
