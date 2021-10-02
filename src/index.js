import ReactDom from 'react-dom'
import App from './App'
import LoginProvider from './context/Auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';


function Main (){
    return (<>
    <LoginProvider>
    <App/>
    </LoginProvider>
    </>)
}
ReactDom.render(<Main/>,document.getElementById('root'))