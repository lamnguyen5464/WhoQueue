import React from 'react';
import { AppNavigation } from '@navigation';
import { AppProvider } from '@context';
import AppOverlay, { refAppOverlay } from '@navigation/AppOverlay';

const App = () => {
    return (
        <AppProvider>
            <AppNavigation />
            <AppOverlay ref={refAppOverlay} />
        </AppProvider>
    );
};

export default App;
