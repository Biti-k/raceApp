import MainRoutes from './MainRoutes';
import { MainProvider } from '../context/MainProvider';


function Main() {

    return (
        <>
        <MainProvider>
            <MainRoutes></MainRoutes>
        </MainProvider>
        </>
    );
}

export default Main;