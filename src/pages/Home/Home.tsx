import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.css';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <h1>Pagina Home</h1>
      </div>
    </div>
  );
}
