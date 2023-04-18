import { Dimensions, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

export default function ScreenWrapper(props) {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const Tag = props.scroll ? ScrollView : View
  
  return (
    
    <View style={{
        backgroundColor:Colors.lighter,
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        // paddingVertical:10,
        paddingHorizontal:15,
        // backgroundColor:'red',
    }}>
        {
            props.scroll
            ?
            <Tag contentContainerStyle={{
                paddingBottom:25

            }}
            
              showsVerticalScrollIndicator={false}
            >
                {props.children}
            </Tag>
            :
            props.children
        }
    </View>
  )
}

const styles = StyleSheet.create({})