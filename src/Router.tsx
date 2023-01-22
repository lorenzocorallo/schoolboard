import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Homeworks from './pages/Homeworks';
import Login from './pages/Login';
import Marks from './pages/Marks';
import Memos from './pages/Memos';

function Router(){
    // const { isLogged } = useSelector((store: Store) => store.student);
    const isLogged = true; // hard-coded while migrating.

    return (
        <BrowserRouter>
            {isLogged ? (
                <>
                    <Navbar />
                    <Routes>
                        <Route path="memos" element={<Memos/>} />
                        <Route path="homeworks" element={<Homeworks/>} />
                        <Route path="marks" element={<Marks/>} />
                        <Route path="dashboard" element={<Dashboard/>} index={true} />
                    </Routes>
                    <Sidebar />
                </>
            ) : (
                    <Login />
                )}
        </BrowserRouter>
    );
};

export default Router;
