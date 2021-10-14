import React from 'react';
import { AppNavigation, AppOverlay } from '@core/navigation';
import { AppProvider } from '@context';
import { refAppOverlay } from '@core/navigation/AppOverlay';

const App = () => {
    return (
        <AppProvider>
            <AppNavigation />
            <AppOverlay ref={refAppOverlay} />
        </AppProvider>
    );
};

export default App;
