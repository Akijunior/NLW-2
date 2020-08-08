import React from "react";
import {Link} from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import logoImg from "../../assets/images/logo.svg";

import './styles.css';

interface PageHeaderProps { // props que  o componente pode receber
    title: string;
    description?: string; // opcional
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {/*Só executa a 2ª parte se a 1ª for verdadeira*/}
                { props.description && <p>{props.description}</p> }
                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;
