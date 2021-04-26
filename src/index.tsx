import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

if((module as any).hot){
  // accept itself
  (module as any).hot.accept()
}