import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Checkin from '~/pages/Checkin';
import List from '~/pages/AskHelp/List';
import New from '~/pages/AskHelp/New';
import Read from '~/pages/AskHelp/Read';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            AskHelp: {
              screen: createStackNavigator(
                {
                  List,
                  New,
                  Read,
                },
                {
                  headerMode: 'none',
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: <Icon name="help" size={20} color="#ee4e62" />,
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#ffa3af',
              labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
