import "./styles.css";
import { render } from "./render";
import {weatherDataHandler} from './weather';


async function loadPage() {
    render.sidebar();
    render.main();
    await weatherDataHandler.fetchData('bangalore')
}

loadPage();