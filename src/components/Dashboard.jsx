import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { SearchProvider } from './context/SearchContext';

function Dashboard() {

  return (
    <SearchProvider>
      <div className='container root'>
        <Header />
        <Body />
        <Footer />
      </div>
    </SearchProvider>
  )
}

export default Dashboard;