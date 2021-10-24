import React from 'react';
import { AppNavigation, AppOverlay, AppNavigator } from '@core/navigation';
import { AppProvider } from '@context';
import { AppSync } from '@core/sync';

const App = () => {
    return (
        <AppProvider>
            <AppSync />
            <AppNavigation
                ref={ref => {
                    AppNavigator.setNavigator(ref);
                }}
            />
            <AppOverlay
                ref={ref => {
                    AppNavigator.setOverlay(ref);
                }}
            />
        </AppProvider>
    );
};

export default App;
