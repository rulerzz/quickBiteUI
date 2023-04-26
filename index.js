/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from "react-native";

LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    'Non-serializable values were found in the navigation state',
]);
AppRegistry.registerComponent(appName, () => App);
