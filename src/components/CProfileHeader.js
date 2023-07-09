import {
    Text,
    View,
    Pressable,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {horizontalScale, moderateScale, verticalScale} from '../helper/size.helper';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {useNavigation} from '@react-navigation/native';
  
  const CProfileHeader = ({name, onDelete, selected}) => {
    const navigation = useNavigation();
    const [openSearch, setOpenSearch] = useState(false);
    return (
      <>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="left"
                size={moderateScale(16)}
                color={'black'}
              />
            </TouchableOpacity>
            {!selected && <Text style={styles.userNameTxt}>{name}</Text>}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {selected ? (
              <Pressable onPress={onDelete}>
                <AntDesign
                  name="delete"
                  size={moderateScale(22)}
                  color={'black'}
                />
              </Pressable>
            ) : (
              <Pressable>
                <AntDesign
                  name="bars"
                  size={moderateScale(22)}
                  color={'black'}
                  style={{marginLeft: horizontalScale(8)}}
                />
              </Pressable>
            )}
          </View>
        </View>
      </>
    );
  };
  
  export default CProfileHeader;
  
  const styles = StyleSheet.create({
    header: {
      height: verticalScale(60),
      backgroundColor: "white",
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: horizontalScale(24),
    },
    userNameTxt: {
      marginLeft: horizontalScale(8),
      fontSize: moderateScale(18),
      color: 'black',
    },
  });
  