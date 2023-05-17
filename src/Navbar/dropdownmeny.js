import React, {useState, useEffect, useRef } from "react";
import {Link} from 'react-router-dom';

const DropdownMeny = ({ isLoggedIn, setIsLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const trykkapen = () => {
        setIsOpen(!isOpen);
    };

    const handleTrykketUtenfor = (e) => {
        if(ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect (() => {
        document.addEventListener("mousedown", handleTrykketUtenfor);
            // funksjonen skal rydde opp, ved å fjerne listener når det inntreffer
        return () => {
            document.removeEventListener("mousedown", handleTrykketUtenfor);
        };
    }, []); // en tom avhengighetsarray som gjør at effekten kjører kun 1 gang når komponenten monteres i DOM (Document Object Model)

    return (
        <div className={`dropdown-meny ${isOpen ? "show" : "" }`} ref={ref}>
            <button onClick={trykkapen}>Meny</button>
            {isOpen && (
                <div className="dropdown-innhold">
                    <Link to="/Profilside">Profilside</Link>
                    <Link to="/Settings">SettingsSide</Link>
                    <Link to="/">
                        <button
                            onClick={() => {
                                if (isLoggedIn) {
                                    setIsLoggedIn(false);
                                }
                            }}
                        >
                            {isLoggedIn ? "Log Out" : "Log In"}
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default DropdownMeny;