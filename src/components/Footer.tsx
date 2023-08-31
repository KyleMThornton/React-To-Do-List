import {FaGithub} from "react-icons/fa"
import './Footer.css'

export default function Footer() {
    return (
        <footer>
            <span className="footerText">© Kyle Thornton ~ all of the years ~</span>
            <a href="https://github.com/KyleMThornton" target="_blank" rel="noopener noreferrer"><FaGithub className="githubIcon" /></a>
        </footer>
    )
}