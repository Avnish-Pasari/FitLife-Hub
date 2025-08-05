import './styles.css';
import Figure from 'react-bootstrap/Figure';
import logo from './TFClogo.png';
import pic1 from './pic1.jpg';
import pic2 from './pic2.jpg';
import gym1 from './gym1.jpg';
import pic3 from './pic3.jpg';
import gym2 from './gym2.jpeg';
import {GiWeightLiftingUp} from 'react-icons/gi';
import {GiShower} from 'react-icons/gi';
import {GiLockers} from 'react-icons/gi';
import Carousel from 'react-bootstrap/Carousel';

const LandingPage = () => {
    // Code taken and modified from https://react-bootstrap.github.io/components/carousel/
    return (
        <div className='background4'>
            <div className='centre background1'>
                <br></br>
                <h1>Welcome to Toronto Fitness Club</h1>
                <p>Here you can find the best fitness classes in Toronto</p>
                <br></br>
            </div>
            <div className='centre background1'>
                <Figure>
                    <Figure.Image
                        width={400}
                        height={180}
                        alt="171x180"
                        src={logo}
                    />
                </Figure>
                <p>The best fitness club in Toronto.</p>
                <br></br>
            </div> 
            <div className='centre background2'>
            <br></br>
            <br></br>
                <section className="white-section" id="features">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="feature-box col-lg-4">
                        <GiWeightLiftingUp size={70}/>
                        <i className="icon fas fa-check-circle fa-4x" />
                        <h3 className="feature-title">Power Lifting</h3>
                        <p>Grow muscle and stamina with Power Lifiting.</p>
                        </div>
                        <div className="feature-box col-lg-4">
                        <GiShower size={70}/>
                        <i className="icon fas fa-bullseye fa-4x" />
                        <h3 className="feature-title">Shower Up</h3>
                        <p>Personal shower stalls to refresh yourself after a healthy workout.</p>
                        </div>
                        <div className="feature-box col-lg-4">
                        <GiLockers size={70}/>
                        <i className="icon fas fa-heart fa-4x" />
                        <h3 className="feature-title">Locker Facility</h3>
                        <p>Individual lockers to store your personal items.</p>
                        </div>
                    </div>
                    </div>
                </section>
                <br></br>
                <br></br>
            </div>
            <div className='centre background3'>
                <br></br>
                <br></br>
                {/* // Code taken and modified from https://react-bootstrap.github.io/components/carousel/ */}
                <Carousel>
                    <Carousel.Item>
                        <img
                        src={gym1}
                        alt="First slide"
                        height={349}
                        width={620}
                        />
                        <Carousel.Caption>
                        <h3>Spacious Workout</h3>
                        <p>Ample space for all types of workout.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        height={349}
                        width={620}
                        src={gym2}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Cardio Training</h3>
                        <p>Treadmills and Cycling facilities available.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        height={349}
                        width={620}
                        src={pic3}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Weight Training</h3>
                        <p>
                            All weight categories present to meet your needs.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <br></br>
                <br></br>
            </div>
            <div className='centre background4'>
                <p>© TFC Website 2022</p>
            </div>   
        </div>
        );
}

export default LandingPage;