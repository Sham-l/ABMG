import React, {useState, useContext} from 'react';
import {WebView} from 'react-native-webview';
import {View, ActivityIndicator} from 'react-native';
import base64 from 'react-native-base64';

import Screen from '../components/Screen';
import {UserContext} from '../utils/userDataContext';
import { HOME_URL } from '../constants/api';

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);

  const {tempUserId, userId} = useContext(UserContext);
  console.log(tempUserId, 'from home screen', userId);

  const userKey = userId ? base64.encode(userId) : base64.encode(tempUserId);

  return (
    <Screen>
      {isLoading && <ActivityIndicator size="small" color="#7091A4" />}
      <WebView
        source={{uri: `${HOME_URL}${userKey}`}}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </Screen>
  );
}
