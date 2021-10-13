import * as React from 'react';
import { View, Text } from 'react-native';
import { AppNavigation } from '@navigation';
import { AppProvider } from '@context';

const App = () => {
    return (
        <AppProvider>
            <AppNavigation />
        </AppProvider>
    );
};

export default App;
