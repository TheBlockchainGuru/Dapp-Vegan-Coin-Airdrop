import { Container, Row, Col, Modal, Button, InputGroup, FormControl, Form} from 'react-bootstrap';
import { RPCURL, tokenAddress, tokenABI } from '../config';
import Web3 from 'web3';
import Header from '../components/Header';
import { Fade, Zoom } from 'react-reveal';
import React from 'react';
const axios = require('axios')
const nodemailer = require("nodemailer");
const ethers = require('ethers')
const sendmail = require('sendmail')();


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
        tokenContract : [],
        modalShow     : false,
        emailAddress   : '',
        code          : '',
        sellModalShow : false,
        city : '',
        address : '',
        emailString : '',
        hash : '',
        string : '',
        inviteURL : '',
        inviteWalletAddress : '',
        inviteModalShow : false,
        inviteMessage : ''
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
                airdropAddress : accounts[0] + '',
                emailAddress   : '',
                code           : ''
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
            buttonLabel : "Please Claim and receieve 1 million of Vegan Tokens",
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

    handleClose(){
        this.setState({
            modalShow : false
        })
    }

    handleSellClose(){
        this.setState({
            sellModalShow : false
        })
    }

    handleShow(){
        this.setState({
            modalShow : true
        })
    }

    handleInviteClose (){
        this.setState({
            inviteModalShow : false
        })
    }

    async handleConfirm(){
        if (this.state.code === ''||this.state.emailAddress === ''){
            alert("please input email address and code")
            return
        }
        if (this.state.emailAddress.length * 999 === parseInt(this.state.code)){
            this.setState({
                modalShow : false
            })
            await this.airdrop()
        } else {
            alert("please input correct code")
        }
    }

    async inviteClaim (){
        if(this.state.inviteURL == '' || this.state.inviteWalletAddress==''){
            alert("please input URL and Wallet address")
            return
        }
        let message = "URL : " + this.state.inviteURL + "\n" + "WalletAddress : " + this.state.inviteWalletAddress
        this.setState({
            inviteModalShow : true,
            inviteMessage   : message
        })
    }

    async sell(){
        if(this.state.airdropAddress === ""){
            alert("please connect your wallet")
            return
        }
        let balance = await tokenContract.methods.balanceOf(this.state.airdropAddress + '').call()
        if (balance/1 < 1000000000000000000000000){
            alert("there is no enough coin!") 
            return
        } else {
            let ownerAddress =await this.state.tokenContract.methods.owner().call()
            let sendamount = ethers.BigNumber.from("1000000000000000000000000")
            await this.state.tokenContract.methods.transfer(ownerAddress, sendamount).send({
                from : this.state.airdropAddress,
                }).once('confirmation', async (receipt, result1, result2) => {
                    console.log(result1)
                    this.setState({
                        sellModalShow : true
                    })
                    this.setState({
                        hash : result1.transactionHash
                    })
                })
        }
    }

    async handleSell(){
        let string = "transaction hash: \n" +this.state.hash + "\nwallet address is \n"+this.state.airdropAddress+ "\nURL : \nhttps://etherscan.io/tx/" + this.state.hash + " \naddress is : "  +this.state.city + "\n" 
        this.setState({
            hash : '',
            city : '',
            string : string
        })
        // axios.post('https://veganserver.herokuapp.com:5000/todo', {
        //     hash: this.state.hash,
        //     walletAddress : this.state.airdropAddress,
        //     city : this.state.city,
        //   })
    }
    render () {
        const handleEmailAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              emailAddress : addLabel
            }) 
        }  

        const handlecode =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              code : addLabel
            }) 
        }
        
        const handlecity =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              city : addLabel
            }) 
        }  

        const handleInviteURL =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              inviteURL : addLabel
            }) 
        }  

        const handleInviteWalletAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              inviteWalletAddress : addLabel
            }) 
        }  


        
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
                    <div className="box">
                        <Container>
                            <Row>
                                <Col lg="1" md="1"></Col>
                                <Col lg="10" md="10" sm="12" xs="12">
                                    <h1>Get Rob's Box for 10 million Vegan Rob's Coins</h1>
                                </Col>
                                <Col lg="1" md="1"></Col>
                                <Col lg="4" md="4" sm="12" xs="12">
                                    <img src={require('../assets/img/box.webp').default} />
                                </Col>
                                <Col lg="6" md="6" sm="12" xs="12">
                                    <p>Rob's Box is a collection of exclusive snacks, swag and wisdom sent from Vegan Rob's straight to your door!</p>
                                </Col>
                                <Col lg="12" md="12" sm="12" xs="12" className="get-box">
                                    <Button onClick = {()=> this.sell()}>Get Rob's Box!</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div className="cliam" onClick = {()=> this.handleShow()} disabled ={this.state.airDropped}>
                        <Fade left duration={3000}>
                            <h2>
                                {this.state.buttonLabel}
                                {/* Claim 1 million FREE Vegan Rob's Coins */}
                            </h2>
                            <p>{this.state.airdropAddress}</p>
                            
                        </Fade>
                    </div>


                    <div className="million"  onClick = {()=> this.airdrop()}>
                        <Fade right duration={3000}>
                            <h3>1 million Free Coins </h3>
                            <h3>Early Adopters get 1 million coins for free!</h3>
                            <h4>It's not too late for you! Click the button above to claim your coins!</h4>
                            <p>AirDrop Left : {this.state.leftTime} </p>
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
                                    <h4>
                                        Just Bought Snacks? Claim your coins!
                                    </h4>
                                    <Row>
                                        <Form.Label column="sm" lg={5}>
                                            Email
                                        </Form.Label>
                                        <Col>
                                        <Form.Control size="sm" type="text" defaultValue={this.state.emailAddress} onChange={handleEmailAddress}/>
                                        </Col>
                                    </Row>
                                    <Row className="padding-top-20">
                                        <Form.Label column="sm" lg={5}>
                                            Confirmation code
                                        </Form.Label>
                                        <Col>
                                        <Form.Control size="sm" type="text" defaultValue={this.state.code} onChange={handlecode}/>
                                        </Col>
                                    </Row>
                                    <Row className="padding-top-20">
                                        <Form.Label column="sm" lg={5}>
                                        </Form.Label>
                                        <Col>
                                            <Button onClick={()=>this.handleConfirm()}>Claim</Button>
                                        </Col>
                                    </Row>
                                </Col>


                                <Col lg="4" md="4" sm="12" className="next-col">
                                    <h5>Invite friends to our Instagram</h5>
                                    <p>Invite 5 friends to follow us and we will send you coins!</p>
                                    <img src={require('../assets/img/online1.webp').default} />
                                    <div className='get-vegan'>
                                        <h4>
                                            Input invite URL and get Vegan coins
                                        </h4>
                                        <Row>
                                            <Form.Label column="sm" lg={5}>
                                                URL
                                            </Form.Label>
                                            <Col>
                                            <Form.Control size="sm" type="text" defaultValue={this.state.inviteURL} onChange={handleInviteURL}/>
                                            </Col>
                                        </Row>
                                        <Row className="padding-top-20">
                                            <Form.Label column="sm" lg={5}>
                                                Wallet Address
                                            </Form.Label>
                                            <Col>
                                            <Form.Control size="sm" type="text" defaultValue={this.state.inviteWalletAddress} onChange={handleInviteWalletAddress}/>
                                            </Col>
                                        </Row>
                                        <Row className="padding-top-20">
                                            <Form.Label column="sm" lg={5}>
                                            </Form.Label>
                                            <Col>
                                                <Button onClick={()=>this.inviteClaim()}>Claim</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                </Col>





                                <Col lg="4" md="4" sm="12" className="next-col">
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
                                        ??? 1 million Vegan Rob's Coins will be sent to the first 1000 early adopters for free! 
                                        </li>
                                        <li>
                                        ??? Earn 1 million Vegan Rob's Coins  every time you buy a bag of Vegan Rob's Snacks
                                        </li>
                                    </ul>
                                </Fade>
                            </Col>
                            <Col lg="6" md="6" sm="12">
                                <Fade right duration={3000}>
                                    <ul>
                                        <li>
                                        ??? Holders of over 10 million coins get access to "Rob's Box". A monthly assortment of exclusive snacks, prizes and wisdom
                                        </li>
                                        <li>
                                        ??? Vegan Rob's NFTs are coming soon and  will provide holders a piece of snack history!
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
                                        ??? Total Supply=  1 Trillion Tokens.  50 % will be seeded as liquidity and the rest will be held by Vegan Rob's to reward holders and promote the project.
                                        </li>
                                        <li>
                                        ??? Rob's Box will offer exclusive and unique value only available to holders.
                                        </li>
                                        <li>
                                        ??? Token holders will get access to a Vegan Rob's NFT collectible project coming soon
                                        </li>
                                        <li>
                                        ??? No external wallet will be able to hold more than 1% of total supply as whale protection
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
                            <img src={require('../assets/img/roadmap2.webp').default} id="roadmap" style = {{width : '60%'}}/>
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

                    <Modal show={this.state.modalShow} onHide={()=>this.handleClose()}>
                        <Modal.Header closeButton>
                        <Modal.Title>User Verification</Modal.Title>
                        </Modal.Header >
                        <Modal.Body>Please input your E-mail Address and code</Modal.Body>
                        <div className = "row">
                            <div className = "col-1"></div>
                            <div className = "col-10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder= "E-mail address" defaultValue = {this.state.city} onChange={handleEmailAddress}/>
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder= "code" defaultValue = {this.state.address} onChange={handlecode}/>
                                </InputGroup>
                            </div>
                            <div className = "col-1"></div>
                        </div>
                        
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>this.handleConfirm()}>
                            Claim
                        </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.sellModalShow} onHide={()=>this.handleSellClose()}>
                        <Modal.Header closeButton>
                        <Modal.Title>Input Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please input your Delivery Address</Modal.Body>
                        <div className = "row">
                            <div className = "col-1"></div>
                            <div className = "col-10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder= "Your address" defaultValue = {this.state.city} onChange={handlecity}/>
                                </InputGroup>

                                <Button variant="primary" onClick={()=>this.handleSell()}>
                                    Generate message
                                </Button>
                                <h6>Please send mail to us with below address and message, And you will get box!</h6>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control as="textarea" rows={1} defaultValue="harry@veganrobscoin.com"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>message</Form.Label>
                                    <Form.Control as="textarea" rows={7} defaultValue={this.state.string}/>
                                </Form.Group>
                            </div>
                            <div className = "col-1"></div>
                        </div>

                        <Modal.Footer>
                        <Button variant="primary" onClick={()=>this.handleSellClose()}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.inviteModalShow} onHide={()=>this.handleInviteClose()}>
                        <Modal.Header closeButton>
                        <Modal.Title>Claim Invite Coin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please Send Email to below address with below content</Modal.Body>
                        <div className = "row">
                            <div className = "col-1"></div>
                            <div className = "col-10">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control as="textarea" rows={1} defaultValue="harry@veganrobscoin.com"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>message</Form.Label>
                                    <Form.Control as="textarea" rows={7} defaultValue={this.state.inviteMessage}/>
                                </Form.Group>
                            </div>
                            <div className = "col-1"></div>
                        </div>
                        <Modal.Footer>
                        <Button variant="primary" onClick={()=>this.handleInviteClose()}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        );
    }
}
export default Home;
