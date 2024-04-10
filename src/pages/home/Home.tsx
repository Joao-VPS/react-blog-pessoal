import homeImage from '../../assets/img/home.jpg'
import './Home.css'
import Card from '../../components/card/Card';

interface MinhaProps {
    title: string;
    description: string;
}

function Home(props:MinhaProps) {
  return (
    <>
        <h1 className="title">{props.title}</h1>
        <p>{props.description}</p>
        <Card name='Teste'/>
        <Card name='Teste1'/>
        <Card name='Teste2'/>
        <img src={homeImage} alt="Imagem do início" />
    </>
  )
}
export default Home