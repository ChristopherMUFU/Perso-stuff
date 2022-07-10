import './styles.css';
import Bienvenue from './bienvenue/Bienvenue';
import InfoOne from './infoOne/InfoOne';
import InfoTwo from './infoTwo/InfoTwo';
import Adherer from './adherer/Adherer';
import HomeActualite from './homeActualite/HomeActualite';
import ContactForm from './contactForm/ContactForm';

import { useSelector } from "react-redux";
import { getNewsState } from "../../../app/Redux-slices/newsSlice";

const Home = () => {
    // If we do have the news loaded from the API, we can display the component, and put the newsData Object in its props
    const isNewsLoaded = useSelector(getNewsState).isNewsLoaded;
    const newsData = useSelector(getNewsState).news;

    return (
        <section>
            <Bienvenue />
            <InfoOne />
            <InfoTwo />
            <Adherer />
            {isNewsLoaded && (
                <HomeActualite {...newsData}/>
            )}
            <ContactForm />
        </section>
    )
}

export default Home;