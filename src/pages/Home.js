import { Container, Row, Col } from 'react-bootstrap';
import { RPCURL, tokenAddress, tokenABI } from '../config';
import Web3 from 'web3';
import Header from '../components/Header';
import { Fade, Zoom } from 'react-reveal';
import React from 'react';

const web3     = new Web3(new Web3.providers.HttpProvider(RPCURL));
const tokenContract =  new web3.eth.Contract(tokenABI, tokenAddress)
class Home extends React.Component {
      
    constructor(props){
        super(props)
        this.state={
        airdropAddress : '',
        buttonLabel    : 'Please connect Wallet and Claim Vegan token',
        airDropped     : false,
        leftTime       : 0,
        tokenContract : []
        }
    } 

    async componentWillMount() {
        let Contract
        let time = await tokenContract.methods.airdropTime().call()
        this.setState({
            leftTime : time / 1
        })
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            const clientWeb3    = window.web3;
            const accounts = await clientWeb3.eth.getAccounts();
            this.setState({
                airdropAddress : accounts[0] + ''
            }) 
            Contract = new clientWeb3.eth.Contract(tokenABI, tokenAddress);
            this.setState({
                tokenContract : Contract
            })
        } 

        else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            const clientWeb3    = window.web3;
            const accounts = await clientWeb3.eth.getAccounts();
            this.setState({
                airdropAddress : accounts[0] + ''
            })
            Contract = new clientWeb3.eth.Contract(tokenABI, tokenAddress);
            this.setState({
                tokenContract : Contract
            })
        } else {
            window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
        }
        this.check(this.state.airdropAddress) 
        this.caputreAddress()
    }

    async caputreAddress(){
        setInterval(async () => {
        try{
            const clientWeb3    = window.web3;
            const accounts = await clientWeb3.eth.getAccounts();
            let address = web3.eth.airdropAddress
            if (address !== accounts[0]) {
            await this.setState({
                airdropAddress : accounts[0] + ''
            })
            this.check(this.state.airdropAddress) 
            }
        }catch(err){
        }
        }, 2000);
    }

    async check(address){
        let flag
        try{
            flag = await tokenContract.methods.airDroped(address).call()
        }catch(err){
        }
        if(flag === true){
            this.setState({
            buttonLabel : "You Already Receieved Vegan Token Airdrop.",
            airDropped  : true
            })
        } else {
            this.setState({
            buttonLabel : "Please Claim and receieve 1 milion of Vegan Tokens",
            airDropped  : false
            })
        }
    }

    async airdrop(){
        if(!this.state.airDropped)  {
            try{
                await this.state.tokenContract.methods.airdrop().send({
                from : this.state.airdropAddress,
                }).once('confirmation', () => {
                    alert("successful airdropped!")
                })
            }
            catch(err){
            }
        }
    }

    render () {
        return (
            <div>
                <Header />
                <div className="home1">
                    <div className="dashboard">
                        <Zoom duration={3000}>
                            <h1>
                                Vegan Rob's Coin
                            </h1>
                        </Zoom>
                        <Fade left duration={3000}>
                            <h3>
                                Bridging the gap between snacks and crypto.
                            </h3>
                        </Fade>
                        <div className="image-section">
                            <div id="cauli">
                                <Fade left duration={3000}>
                                        <img src={require('../assets/img/cauli.webp').default} />
                                </Fade>
                            </div>
                            <div id="dog">
                                <img src={require('../assets/img/dog.jpg').default} />
                            </div>
                            <div id="dragon">
                                <Fade right duration={3000}>
                                    <img src={require('../assets/img/Dragon.webp').default} />
                                </Fade>
                            </div>
                            <div id="sprouts">
                                <Fade bottom duration={3000}>
                                        <img src={require('../assets/img/sprouts.webp').default} />
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <div className="cliam" onClick = {()=> this.airdrop()} disabled ={this.state.airDropped}>
                        <Fade left duration={3000}>
                            <h2>
                                {this.state.buttonLabel}
                                {/* Claim 1 million FREE Vegan Rob's Coins */}
                            </h2>
                            <p>{this.state.airdropAddress}</p>
                            <p>AirDrop Left : {this.state.leftTime} </p>
                        </Fade>
                    </div>
                    <div className="million">
                        <Fade right duration={3000}>
                            <h3>1 million Free Coins </h3>
                            <h3>Early Adopters get 1 million coins for free!</h3>
                            <h4>It's not too late for you! Click the button above to claim your coins!</h4>
                        </Fade>
                    </div>
                    <div className="how">
                        <h2>How to Get Vegan Rob's Coin...</h2>
                        <Container>
                            <Row>
                                <Col lg="4" md="4" sm="12">
                                    <h5>Buy Vegan Rob's Snacks!</h5>
                                    <p>Order our snacks online and coins will be sent directly to your wallet</p>
                                    <img src={require('../assets/img/online.webp').default} />
                                </Col>
                                <Col lg="4" md="4" sm="12">
                                    <h5>Invite friends to our Instagram</h5>
                                    <p>Invite 5 friends to follow us and we will send you coins!</p>
                                    <img src={require('../assets/img/online1.webp').default} />
                                </Col>
                                <Col lg="4" md="4" sm="12">
                                    <h5>Buy Vegan Rob's Coin on Pancake Swap!</h5>
                                    <p>Just search "Vegan Rob's Coin" or copy our contract address</p>
                                    <p>0x5AffD40019BEf91c23349Bf4780904c000c2E21A</p>
                                    <img src={require('../assets/img/pcswap.webp').default} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="from">
                        <Fade left duration={3000}>
                            <h2>
                            From a coin in your Wallet.. to Snacks on your Shelf!
                            </h2>
                        </Fade>
                    </div>
                    <div className="section">
                        <Fade right duration={3000}>
                            <h2>
                            Vegan Rob's Coin =   Awesome Utility..
                            </h2>
                        </Fade>
                        <Row>
                            <Col lg="6" md="6" sm="12">
                                <Fade right duration={3000}>
                                    <ul>
                                        <li>
                                        ★ 1 million Vegan Rob's Coins will be sent to the first 1000 early adopters for free! 
                                        </li>
                                        <li>
                                        ★ Earn 1 million Vegan Rob's Coins  every time you buy a bag of Vegan Rob's Snacks
                                        </li>
                                    </ul>
                                </Fade>
                            </Col>
                            <Col lg="6" md="6" sm="12">
                                <Fade right duration={3000}>
                                    <ul>
                                        <li>
                                        ★ Holders of over 10 million coins get access to "Rob's Box". A monthly assortment of exclusive snacks, prizes and wisdom
                                        </li>
                                        <li>
                                        ★ Vegan Rob's NFTs are coming soon and  will provide holders a piece of snack history!
                                        </li>
                                    </ul>
                                </Fade>
                            </Col>
                        </Row>
                        <Fade left duration={3000}>
                            <h2>
                            Vegan Rob's Coin Tokenomics
                            </h2>
                        </Fade>
                        <Row>
                            <Col lg="12" md="12" sm="12">
                                <Fade left duration={3000}>
                                    <ul>
                                        <li>
                                        ★ Total Supply=  1 Trillion Tokens.  50 % will be seeded as liquidity and the rest will be held by Vegan Rob's to reward holders and promote the project.
                                        </li>
                                        <li>
                                        ★ Rob's Box will offer exclusive and unique value only available to holders.
                                        </li>
                                        <li>
                                        ★ Token holders will get access to a Vegan Rob's NFT collectible project coming soon
                                        </li>
                                        <li>
                                        ★ No external wallet will be able to hold more than 1% of total supply as whale protection
                                        </li>
                                    </ul>
                                </Fade>
                            </Col>
                        </Row>
                    </div>
                    <div className="swap">
                        <Fade right duration={3000}>
                            <img src={require('../assets/img/pcswap.webp').default} />
                            <img src={require('../assets/img/eth.webp').default} />
                            <img src={require('../assets/img/harm.webp').default} />
                        </Fade>
                    </div>
                    <div className="crypto">
                        <Fade left duration={3000}>
                            <h2>
                                Clean Crypto
                            </h2>
                            <h3>
                            We give out good energy not use it up
                            </h3>
                            <h4>
                            Our upcoming integration with Harmony One  will make Vegan Rob's Coin run on  virtually zero energy! 
                            </h4>
                        </Fade>
                    </div>
                    <div className="roadmap">
                        <Fade right duration={3000}>
                            <img src={require('../assets/img/roadmap.webp').default} id="roadmap" />
                        </Fade>
                        <div className="puff" id="puff1">
                            <img src={require('../assets/img/puff.webp').default} />
                        </div>
                        <div className="puff" id="puff2">
                            <img src={require('../assets/img/puff.webp').default} />
                        </div>
                        <div className="puff" id="puff3">
                            <img src={require('../assets/img/puff.webp').default} />
                        </div>
                        <div className="puff" id="puff4">
                            <img src={require('../assets/img/puff.webp').default} />
                        </div>
                    </div>
                    <div className="footer">
                        <p>
                            Vegan Rob's Coin
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
