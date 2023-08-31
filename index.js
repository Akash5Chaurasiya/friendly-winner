/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/reducer/postReducer/store';
import { ModalProvider } from 'react-native-modalfy';

const AppWithProvider = () => (
    <Provider store={store}>
            <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);
