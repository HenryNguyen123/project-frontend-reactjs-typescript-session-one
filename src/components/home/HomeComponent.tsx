
import React, { useEffect } from "react";

const HomeComponent: React.FC = () => {

    useEffect(() => {
        document.title = 'Home';
    }, [])
    return(
        <>
            <div>
                <h1>HomeComponent</h1>
            </div>
        </>

    )
}

export default HomeComponent