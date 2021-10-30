import { useSelector, keySelector, useDispatch, actions } from '@context';
import { ROOT_STACKS_ENUM, STACKS } from './StackConstants';

const useNavigationStack = () => {
    const navigationStack = useSelector(keySelector.navigationStack);
    const dispatch = useDispatch();

    const setStack = payload => {
        actions.setNavigationStack({ dispatch, payload });
    };

    const activateMainApp = () => {
        setStack(ROOT_STACKS_ENUM.MainAppStack);
    };

    const deactivateMainAppStack = () => {
        setStack(ROOT_STACKS_ENUM.AuthStack);
    };

    const isLoginSuccess = () => {
        return navigationStack === ROOT_STACKS_ENUM.MainAppStack;
    };

    const CurrentStack = STACKS?.[navigationStack] || STACKS.AuthStack;

    return {
        CurrentStack,
        isLoginSuccess,
        navigationStack,
        activateMainApp,
        deactivateMainAppStack,
    };
};

export default useNavigationStack;
