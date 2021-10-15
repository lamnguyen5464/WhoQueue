import React from 'react';
import { AppNavigation, AppOverlay, AppNavigator } from '@core/navigation';
import { AppProvider } from '@context';

const App = () => {
    return (
        <AppProvider>
            <AppNavigation
                ref={ref => {
                    AppNavigator.setNavigator(ref);
                }}
            />
            <AppOverlay
                ref={ref => {
                    AppNavigator.getOverlay(ref);
                }}
            />
        </AppProvider>
    );
};

export default App;
