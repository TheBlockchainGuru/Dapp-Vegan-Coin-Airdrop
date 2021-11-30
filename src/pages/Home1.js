import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

const Home1 = () => {
    return (
        <div>
            <Header />
            <div className="home1">
                <div className="dashboard">
                    <h1>
                        Vegan Rob's Coin
                    </h1>
                    <h3>
                        Bridging the gap between snacks and crypto.
                    </h3>
                    <div className="image-section">
                        <Row>
                            <Col lg="4"  md="4" sm="6" xs="12">
                                <img src={require('../assets/img/cauli.webp').default} id="cauli" />
                            </Col>
                            <Col lg="4" md="4" sm="6" xs="12" id="dog-image">
                                <img src={require('../assets/img/dog.jpg').default} id="dog" />
                            </Col>
                            <Col lg="4" md="4" sm="6" xs="12">
                                <img src={require('../assets/img/Dragon.webp').default} id="dragon" />
                            </Col>
                            <Col lg="4" md="4"></Col>
                            <Col lg="4" md="4" sm="6" xs="12">
                                <img src={require('../assets/img/sprouts.webp').default} id="sprouts" />
                            </Col>
                            <Col lg="4" md="4"></Col>
                        </Row>  
                    </div>
                </div>
                <div className="cliam">
                    <h2>
                        Claim 1 million FREE Vegan Rob's Coins
                    </h2>
                </div>
                <div className="million">
                    <h3>1 million Fress Coins </h3>
                    <h3>Early Adopters get 1 million coins for free!</h3>
                    <h4>It's not too late for you! Click the button above to cliam your coins!</h4>
                </div>
                <div className="how">
                    <h2>How to Get Vegan Rob's Coin...</h2>
                    <Container>
                        <Row>
                            <Col lg="4" md="4" sm="12">
                                <h5>Buy Vegan Rob's Snacks!</h5>
                                <p>Order our snacks online and coins will be sent directly to your wallet</p>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <h5>Invite friends to our Instagram</h5>
                                <p>Invite 5 friends to follow us and we will send you coins!</p>
                            </Col>
                            <Col lg="4" md="4" sm="12">
                                <h5>Buy Vegan Rob's Coin on Pancake Swap!</h5>
                                <p>Just search "Vegan Rob's Coin" or copy our contract  address</p>
                                <p>0x001a8ffcb0f03e99141652ebcdecdb0384e3bd6c</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="from">
                    <h2>
                    From a coin in your Wallet.. to Snacks on your Shelf!
                    </h2>
                </div>
                <div className="section">
                    <h2>
                    Vegan Rob's Coin =   Awesome Utility..
                    </h2>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <ul>
                                <li>
                                1 million Vegan Rob's Coins will be sent to the first 1000 early adopters for free! 
                                </li>
                                <li>
                                Earn 1 million Vegan Rob's Coins  every time you buy a bag of Vegan Rob's Snacks
                                </li>
                            </ul>
                        </Col>
                        <Col lg="6" md="6" sm="12">
                            <ul>
                                <li>
                                Holders of over 10 million coins get access to "Rob's Box". A monthly assortment of exclusive snacks, prizes and wisdom
                                </li>
                                <li>
                                Vegan Rob's NFTs are coming soon and  will provide holders a piece of snack history!
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <h2>
                    Vegan Rob's Coin Tokenomics
                    </h2>
                    <Row>
                        <Col lg="12" md="12" sm="12">
                            <ul>
                                <li>
                                Total Supply=  1 Trillion Tokens.  50 % will be seeded as liquidity and the rest will be held by Vegan Rob's to reward holders and promote the project.
                                </li>
                                <li>
                                Rob's Box will offer exclusive and unique value only available to holders.
                                </li>
                                <li>
                                Token holders will get access to a Vegan Rob's NFT collectible project coming soon
                                </li>
                                <li>
                                No external wallet will be able to hold more than 1% of total supply as whale protection
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="swap">

                </div>
                <div className="crypto">
                    <h1>
                        Clean Crypto
                    </h1>
                    <h2>
                    We give out good energy not use it up
                    </h2>
                    <h4>
                    Our upcoming integration with Harmony One  will make Vegan Rob's Coin run on  virtually zero energy! 
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Home1;