import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
    return (
        <View style={styles.container}>
          <Text>Notifications</Text>
        </View>
      )
    }

export default Notification

const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#34D186'
    }
  })