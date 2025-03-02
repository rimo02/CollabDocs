import { Outlet } from 'react-router-dom';
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'

function Layout() {
    return (
        <div className='w-full min-h-screen flex flex-col'>
            {/* <Header /> */}
            <main className="flex-grow flex items-center justify-center">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default Layout