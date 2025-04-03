import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { AuthProvider } from './context/AuthContext';

function Dashboard() {
    return (
        <AuthProvider>
            <div className='container root'>
                <Header />
                <Body />
                <Footer />
            </div>

        </AuthProvider>
    )
}

export default Dashboard;