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
import {Grid} from '@mui/material';
import Bases from './components/Bases/Bases';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Grid container>
                    <Grid item xs={2}>
                        <Bases/>
                    </Grid>
                    <Grid item xs={9}>
                        <Habs/>
                        <Base/>
                    </Grid>
                </Grid>
                <Footer/>
            </Provider>
        </Router>
    );
}

export default App;
