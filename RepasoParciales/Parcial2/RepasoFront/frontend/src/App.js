import './App.css';
import Yo from './components/Yo';
import State from './components/State';
import Effect from './components/Effect';
import Effect_State from './components/Effect_State';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <>
      <Yo nombre={"Pedro"}/>
      <State/>
      <Effect/>
      <Effect_State/>
    </>

  );
}

export default App;
