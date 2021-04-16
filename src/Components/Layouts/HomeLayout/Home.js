import React from 'react';
import Contact from './Contact';
import Gallery from './Gallery';

function Home() {
    return(
        <div style={{marginTop: "100px"}}>
            <div style={{padding: "10px"}}>
                <Gallery></Gallery>
            </div>
            <div  style={{padding: "10px"}}>
                <Contact></Contact>
            </div>
        </div>
    );
}

export default Home;