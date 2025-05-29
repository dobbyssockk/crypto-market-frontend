import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import "./index.css";
import {CryptoFavoritesProvider} from "./contexts/CryptoFavoritesContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CurrencyDetail from "./pages/CurrencyDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
    return (
        <CryptoFavoritesProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/currency/:id" element={<CurrencyDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </CryptoFavoritesProvider>
    );
}

export default App;