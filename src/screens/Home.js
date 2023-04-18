import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Colors from '../constants/Colors'

export default function Home() {
    const [value, setValue]= useState(1)
    const [selectedValue, setSelectedValue]= useState("AMPER")

    const types= ['AMPER', "KW", "KVA", "HP"]

    const calcs= {
        AMPER:[
            {
                equation:"A x 0.67",
                ratio:0.67,
                unit:"KVA"
            },
            {
                equation:"A x 0.54",
                ratio:0.54,
                unit:"KW"
            },
            {
                equation:"A x 0.72",
                ratio:0.72,
                unit:"HP"
            },
        ],
        KW:[
            {
                equation:"KW x 1.9",
                ratio:1.9,
                unit:"A"
            },
            {
                equation:"KW x 1.25",
                ratio:1.25,
                unit:"KVA"
            },
            {
                equation:"KW x 1.34",
                ratio:1.34,
                unit:"HP"
            },
        ],
        KVA:[
            {
                equation:"KVA x 1.52",
                ratio:1.52,
                unit:"A"
            },
            {
                equation:"KVA x 0.80",
                ratio:0.80,
                unit:"KW"
            },
            {
                equation:"KVA x 1.07",
                ratio:1.07,
                unit:"HP"
            },
        ],
        HP:[
            {
                equation:"HP x 1.40",
                ratio:1.40,
                unit:"A"
            },
            {
                equation:"HP x 0.75",
                ratio:0.75,
                unit:"KW"
            },
            {
                equation:"HP x 0.99",
                ratio:0.99,
                unit:"KVA"
            },
        ],
    }

    const ValueTypeComponent=({type="AMPER"})=>{

        return(
            <View style={{
                justifyContent:"center",
                alignItems:"center",
                // paddingVertical:5,
                // paddingHorizontal:11,
                // marginVertical:4,
                // marginRight:5,
                // flex:1,
                minWidth:90,
                width:"50%",
                minHeight:55,
                padding:5,
                // backgroundColor:'red',
            }}>
                <Pressable style={[{
                    justifyContent:"center",
                    alignItems:"center",
                    flex:1,
                    width:"100%",
                    backgroundColor:type==selectedValue ? Colors.primary : undefined,
                    // backgroundColor:type==selectedValue ? Colors.selectedValue : undefined,
                    paddingVertical:11,
                    // paddingHorizontal:11,
                    // borderWidth:1,
                    // borderColor: "rgba(100, 100, 100, .4)",
                    // borderColor: `rgba(${Colors.rgb.primary}, .5)`,
                    // borderRadius:12,
                }, styles.border]} 
                
                onPress={()=>setSelectedValue(type)}
                 >
                    <Text style={{
                        fontSize:18,
                        fontWeight:selectedValue ==type? "bold":"400",
                        color:selectedValue ==type ? Colors.lighter : Colors.darker,
                        opacity:selectedValue ==type? 1 : .5,

                    }}>{type}</Text>
                    
                </Pressable>
            </View>
        )
    }

    const ValueComponent=({
        value=1,
        unit="KVA",
        equation="(A*0.67)"
    })=>{

        return(
            <View style={{
                flexDirection:'row',
                // justifyContent:"flex-start",
                justifyContent:"space-between",
                alignItems:"baseline",
                // marginTop:15,
                paddingHorizontal:11,
                marginVertical:5,
                // width:"100%",
                // backgroundColor:'red'
            }}>
                {
                    equation
                    &&
                    <Text style={{
                        fontSize:18,
                        fontWeight:"300",
                        marginRight:12,
                        flex:1,
                        color:Colors.darker,
                        alignSelf:"center"
                        
                    }}>{equation+" =>"}</Text>
                
                }
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    alignItems:"baseline",
                    backgroundColor:`rgba(${Colors.rgb.orange}, .05)`,
                    borderRadius:12,
                    padding:5,
                    justifyContent:"space-around",
                    justifyContent:"flex-start",
                    paddingHorizontal:25,
                }}>

                <Text style={{
                    fontSize:25,
                    fontWeight:"500",
                    marginHorizontal:2,
                    // color:Colors.darker
                    color:Colors.orange
                }}>{value}</Text>
                <Text style={{
                    fontSize:19,
                    fontWeight:"400",
                    marginHorizontal:2,
                    color:Colors.darker
                }}>{unit}</Text>
                </View>
            </View>
        )
    }

  return (
    <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Welcome in calc program</Text>
            <View style={{
                
            }}>
                <Text style={styles.stepTitle}>1 -Select which value you have?</Text>
                <View style={{
                    // width:"100%",
                    // backgroundColor:'red',
                    flexDirection:'row',
                    flexWrap:"wrap",
                }}>

                    {types.map((el, i)=><ValueTypeComponent key={i} type={el} />)}
                </View>

                <Text style={styles.stepTitle}>2 -Enter its value</Text>

                <View style={[styles.border, {
                    flexDirection:'row',
                    justifyContent:"center",
                    alignItems:"center",
                    paddingVertical:11,
                    paddingHorizontal:15,
                    // backgroundColor:'red'
                }]}>


                    <Text style={[styles.subTitle, {flex:2, color:Colors.primary}]}>{selectedValue}</Text>
                    <TextInput 
                        value={String(value)}
                        onChangeText={(value)=>setValue(value)}
                        placeholder='1'
                        keyboardType="numeric"
                        style={[{
                            color:Colors.darker,
                            flex:2,
                            fontSize:21,
                            fontWeight:"500",
                            marginHorizontal:10,
                            // backgroundColor:'rgba(100, 100, 100, .07)',
                            backgroundColor:`rgba(${Colors.rgb.primary}, .051)`,
                            // borderWidth:1,
                            borderColor:'rgba(100, 100, 100, .4)',
                            padding:0,
                            paddingVertical:7,
                            textAlignVertical:"center",
                            textAlign:"center",
                            paddingHorizontal:11,
                            borderRadius:9,

                        },]}
                    />
                    {/* <Text style={[styles.subTitle, {fontSize:15,flex:1}]}>A</Text> */}
                </View>


                
                <Text style={styles.stepTitle}>3 -See results</Text>
                <View style={[{
                    paddingHorizontal:9,
                    paddingVertical:11,

                }, styles.border]}>


                    {calcs[selectedValue].map((el, i)=>
                    <ValueComponent key={i} value={(value*el.ratio).toFixed(2)} unit={el.unit} equation={el.equation}/>
                    )}

                </View>
            </View>
                
        </ScrollView>
      <View style={styles.footer}>

      <Text style={{
            
            fontSize:13,
            fontWeight:"300",
            textAlign:"center",
            color:Colors.darker,
            marginRight:5,
        }}>made by:</Text>
      
      <Text style={{
            
            fontSize:13,
            fontWeight:"400",
            textAlign:"center",
            color:Colors.darker,
        }}>younes-ammari</Text>
      
      </View>
    
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
    footer:{
        // position:"absolute",
        // top:Dimensions.get('window').height*.88,
        bottom:22,
        paddingVertical:11,
        zIndex:11,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.lighter
        // backgroundColor:"red",
        // marginTop:55,

    },
    title:{
        fontSize:26,
        fontWeight:"600",
        color:Colors.darker,
        marginTop:15,
    },
    stepTitle:{
        fontSize:20,
        fontWeight:"300",
        color:Colors.darker,
        marginBottom:15,
        marginTop:25,
    },
    subTitle:{
        fontSize:22,
        fontWeight:"500",
        color:Colors.darker,
    },
    value:{
        fontSize:18,
        fontWeight:"500",
        color:Colors.darker,
        marginTop:5,
    },
    border:{
        borderWidth:1,
        // borderColor:'rgba(100, 100, 100, .4)',
        borderColor: `rgba(${Colors.rgb.primary}, .35)`,
        borderRadius:12,

    }

})