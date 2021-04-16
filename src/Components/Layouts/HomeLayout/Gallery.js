import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import pic1 from './images/pic1.jpg';
import pic2 from './images/pic2.jpg';
import pic3 from './images/pic3.jpg';
import pic4 from './images/pic4.jpg';
import pic5 from './images/pic5.jpeg';
import pic6 from './images/pic6.jpeg';


function Gallery() {
    return(
        <div>
            <MediaQuery query="(min-width: 1200px)">
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic1} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic2} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic3} rounded />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic4} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic5} rounded />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic6} rounded />
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
            <MediaQuery query="(max-width: 1200px)">
                <Container>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic1} roundedCircle />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic2} roundedCircle />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic3} roundedCircle />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic4} roundedCircle />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic5} roundedCircle />
                        </Col>
                        <Col>
                            <Image style={{width: "100%", height: "80%"}} src={pic6} roundedCircle />
                        </Col>
                    </Row>
                </Container>
            </MediaQuery>
        </div>
    );
}

export default Gallery;