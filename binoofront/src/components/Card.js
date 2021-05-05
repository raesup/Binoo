import React from 'react';
import slide1 from '../images/binoo3.jpg';
import slide2 from '../images/binoo1.jpg';
import slide3 from '../images/binoo2.jpg';
import natural from '../images/natural.jpg';
import bath from '../images/bath.jpg';
import laundry from '../images/laundry.jpg';
import all from '../images/all.jpg';
import scrub from '../images/scrub.jpg';
import candle from '../images/candle.jpg';

import './Card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Cards() {
	return (
		<div>
			{/* <h1 className="h1text">BINOO</h1> */}
			<div className="best">
				<Link to="/shop">
					<Carousel className="carousel">
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={slide1}
								alt="First slide"
							/>
							{/* <Carousel.Caption>
								<h3 style={{ color: 'white' }}>First slide label</h3>
								<p>
									Nulla vitae elit libero, a pharetra augue mollis
									interdum.
								</p>
							</Carousel.Caption> */}
						</Carousel.Item>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={slide2}
								alt="Second slide"
							/>

							{/* <Carousel.Caption>
								<h3 style={{ color: 'white' }}>Second slide label</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing
									elit.
								</p>
							</Carousel.Caption> */}
						</Carousel.Item>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={slide3}
								alt="Third slide"
							/>

							{/* <Carousel.Caption>
								<h3 style={{ color: 'white' }}>Third slide label</h3>
								<p>
									Praesent commodo cursus magna, vel scelerisque nisl
									consectetur.
								</p>
							</Carousel.Caption> */}
						</Carousel.Item>
					</Carousel>
				</Link>
				{/* <Link to="/shop">
					<button>Show More</button>
				</Link> */}
			</div>
			<div className="category">
				<div className="overflow">
					<div className="card_row">
						{/* <div className="col-md-4 mb-5 "> */}
						<Link to="/shop">
							<figure>
								<img src={all} alt="category1" className="card-img" />
								<figcaption>All</figcaption>
							</figure>
						</Link>
						{/* </div>
						<div className="col-md-4"> */}
						<Link to="/shop/1">
							<figure>
								<img
									src={natural}
									alt="category1"
									className="card-img"
								/>
								<figcaption>NATURAL SOAP</figcaption>
							</figure>
						</Link>
						{/* </div>
						<div className="col-md-4"> */}
						<Link to="/shop/2">
							<figure>
								<img src={bath} alt="category1" className="card-img" />
								<figcaption>BATH TEA</figcaption>
							</figure>
						</Link>
						{/* </div>
						<div className="col-md-4"> */}
						<Link to="/shop/3">
							<figure>
								<img src={scrub} alt="category1" className="card-img" />
								<figcaption>SCRUB</figcaption>
							</figure>
						</Link>
						{/* </div>
						<div className="col-md-4"> */}
						<Link to="/shop/4">
							<figure>
								<img
									src={laundry}
									alt="category1"
									className="card-img"
								/>
								<figcaption>LAUNDRY&DISH</figcaption>
							</figure>
						</Link>
						{/* </div>
						<div className="col-md-4"> */}
						<Link to="/shop/5">
							<figure>
								<img
									src={candle}
									alt="category1"
									className="card-img"
								/>
								<figcaption>CANDLE</figcaption>
							</figure>
						</Link>
					</div>
				</div>
			</div>
		</div>
		// </div>
	);
}

export default Cards;
