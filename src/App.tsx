
import ToastifyComponent from './components/toast/ToastifyComponent'
import AppRouter from './router/AppRouter'

function App() {
 

  return (
    <>
      <div className='container'>
        <div className='appCss'>
          <div>
            <AppRouter/>
          </div>
        </div>
      </div>

      <ToastifyComponent/>
    </>
  )
}

export default App
