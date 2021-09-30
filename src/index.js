import ReactDom from 'react-dom'
import App from './App'
import LoginProvider from './context/Auth'

function Main (){
    return (<>
    <LoginProvider>
    <App/>
    </LoginProvider>
    </>)
}
ReactDom.render(<Main/>,document.getElementById('root'))