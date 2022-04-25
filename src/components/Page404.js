import React from 'react';
import {Link} from 'react-router-dom';

function Page404() {
    return(
        <div className="page404">
            <h1>
                Esta página não existe
            </h1>
            <Link to="/">Voltar ao início</Link>
        </div>
    )
}

export default Page404;