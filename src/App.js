import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Container>
        <Row id="first-section">
          <Col lg="7" md="12" sm="12" xs="12">
            <div id="drop-button">
              <Button variant={'warning'}>Claim 1 million FREE Vegan Rob's Coins</Button>
            </div>
            <div id="section_1">
              <h1>Vegan Rob's Coin</h1>
              <p>
                Bridging the gap between snacks and crypto.
              </p>
            </div>
            <div>
              <Row id="middle-image-section">
                <Col lg="4"  md="12" sm="12" xs="12">
                  <img src={require('./assets/img/cauli.webp').default} id="cauli" />
                </Col>
                <Col lg="4" md="12" sm="12" xs="12" id="dog-image">
                  <img src={require('./assets/img/dog.jpg').default} id="dog" />
                </Col>
                <Col lg="4" md="12" sm="12" xs="12">
                  <img src={require('./assets/img/Dragon.webp').default} id="dragon" />
                </Col>
                <Col lg="4"></Col>
                <Col lg="4" md="12" sm="12" xs="12">
                  <img src={require('./assets/img/sprouts.webp').default} id="sprouts" />
                </Col>
                <Col lg="4"></Col>
              </Row>
            </div>
          </Col>
          <Col lg={5} md="12" sm="12" xs="12">
            <div id="section_2">
              <h2>
                From a coin In your Wallet..
              </h2>
              <h6>
                to
              </h6>
              <h2>Snacks on your Shelf!</h2>
            </div>
            <div id="section_3">
              <h1>
                Vegan Rob's Coin<span>=</span> Awesome Utility..
              </h1>
              <div>
                <ul>
                  <li>1 million Vegan Rob's Coins will be sent to the first 1000 early adopters for free!</li>
                  <li>Earn 1 million Vegan Rob's Coins every time you buy a bag of Vegan Rob's Snacks</li>
                  <li>Holders of over 10 million coins get access to "Rob's Box". A monthly assortment of exclusive snacks prizes and wisdom</li>
                  <li>Vegan Rob's NFTs are coming soon and will provide holders a piece of snack history!</li>

                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="second-section">
          <Col lg="6" md="12" sm="12" xs="12">
            <div id="section_5">
              <h1>1 million Free Coins</h1>
              <div>
                <h1>
                  Early Adopters get 1 million coins for free!
                </h1>
                <p>
                  It's no too late for you! Click the button above to claim your coins!
                </p>
              </div>
            </div>
          </Col>
          <Col lg="6" md="12" sm="12" xs="12">
            <div id="section_6">
              <h4>Vegan Robs's Coin Tokenomics</h4>
              <div>
                <ul>
                  <li>
                    Total Supply= 1 Trillion Tokens. 50% will be seeded as liquidity and the rest will be held by Vegan Rob's to reward holders and promote the projet.
                  </li>
                  <li>
                    Rob's Box will offer exclusive and unique value only available to holders.
                  </li>
                  <li>
                    Token holders will get access to a Vegan Rob's NFT collectiable project coming soon
                  </li>
                  <li>
                    No external wallet will be able to hold more than 1% of total supply as whale protection
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row id="third-section">
          <Col lg="3" md="4" sm="6" xs="12" className="img-container">
            <img src={require('./assets/img/bany.jpg').default } />
          </Col>
          <Col lg="2" md="4" sm="6" xs="12" className="img-container">
            <img src={require('./assets/img/ether.jpg').default } />
          </Col>
          <Col lg="3" md="4" sm="6" xs="12" className="img-container">
            <img src={require('./assets/img/harmony.jpg').default } />
          </Col>
          <Col lg="4" md="6" sm="6" xs="12">
            <div id="section_7">
              <h1>Clean Crypto</h1>
              <p>
                We give out good energy not use it up
              </p>
              <div>
                Our upcoming integration with Harmony One will make Vegan Rob's Coin run on virtually zero energy!
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div id="fourth-section">
        <img src={require('./assets/img/puff.webp').default} id="puff-1" className="puff" />
        <img src={require('./assets/img/puff.webp').default} id="puff-2" className="puff" />
        <img src={require('./assets/img/map.jpg').default} id="map" />
        <img src={require('./assets/img/puff.webp').default} id="puff-3" className="puff" />
        <img src={require('./assets/img/puff.webp').default} id="puff-4" className="puff" />
      </div>
    </div>
  );
}

export default App;
