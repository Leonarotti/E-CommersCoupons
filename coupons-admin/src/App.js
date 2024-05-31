import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EnterpriseManagement from './components/enterpriseManagement/EnterpriseManagement';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<EnterpriseManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
