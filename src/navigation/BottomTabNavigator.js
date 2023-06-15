import {Image, StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contacts from '../screens/Contacts';
import ChatScreen from '../screens/ChatScreen';
import Chats from '../screens/Chats';
import Settings from '../screens/Settings';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'rgba(15, 24, 40, 1)',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Contacts
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#0F1828',
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                </View>
              ) : (
                <View style={{height: 25, width: 26}}>
                  <Feather name="users" size={25} color={'black'} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'rgba(15, 24, 40, 1)',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    Chats
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#0F1828',
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                </View>
              ) : (
                <View style={{height: 25, width: 25}}>
                  <Ionicons name="chatbubble-outline" size={25} color={'black'} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'rgba(15, 24, 40, 1)',
                      fontSize: 14,
                      fontWeight: '600',
                    }}>
                    More
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#0F1828',
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                </View>
              ) : (
                <View style={{height: 24, width: 26}}>
                  <Entypo name="dots-three-horizontal" size={25} color={'black'} />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
