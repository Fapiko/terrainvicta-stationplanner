import './App.css';
import Habs from './components/Habs/Habs';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Base from './components/Base/Base';
import store from './store';
import {Provider} from 'react-redux';
import Footer from './components/Footer';

function App() {
    return (
        <Provider store={store}>
            <Habs/>
            <Base/>
            <Footer/>
        </Provider>
    );
}

export default App;
