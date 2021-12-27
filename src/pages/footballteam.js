import '../assets/css/footballteam.css';
import React, { Component } from 'react';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Index from '../playgroundpage';
import theme from '../playgroundpage/style/theme';
import { Provider, reducer, initialState } from '../playgroundpage/state';

import config from '../config/endpoints.json'
import playerdata from '../config/player.json'

const playgrdURL = config.playgroundURL;

var data = playerdata.home;

class FootballPlayer extends Component{
    constructor(props){
        super(props);
        this.positiondata = {
            "LW" : {
                "left" : "20%",
                "top" : "27%"
            },
            "ST" : {
                "left" : "32%",
                "top" : "27%"
            },
            "RW" : {
                "left" : "68%",
                "top" : "27%"
            },
            "LM" : {
                "left" : "24%",
                "top" : "59%"
            },
            "LCM" : {
                "left" : "38%",
                "top" : "48%"
            },
            "RCM" : {
                "left" : "60%",
                "top" : "48%"
            },
            "RM" : {
                "left" : "73%",
                "top" : "59%"
            },
            "LCB" : {
                "left" : "40%",
                "top" : "72%"
            },
            "CB" : {
                "left" : "49%",
                "top" : "65%"
            },
            "RCB" : {
                "left" : "58%",
                "top" : "72%"
            },
            "GK" : {
                "left" : "49%",
                "top" : "81%"
            },
        }
    }

    render(){
        return(
            <div class="player-item" style={{ top: this.positiondata[this.props.position].top,
                left: this.positiondata[this.props.position].left }}>
                <img src={this.props.url} title={this.props.position}></img>
                <p className='player-name'>{this.props.name}</p>
            </div>
        );
    }
}

class FootballTeam extends Component{
    constructor(props){
        super(props);
        this.sendRequest = this.sendRequest.bind(this);
        this.state = {
            maindata : initialState
        }
    }

    render(){
        return(
            // <div className='field-container'>
            //     {/* <h1 className='center-txt'>FOOTBALL LEAGUE</h1> */}
            //     <canvas class="football-field" id="canvas">
            //         {data.map((obj,key) => (
            //             <FootballPlayer url={obj.url} name={obj.name} position={obj.position}/>
            //         ))}
            //     </canvas>
            // </div>
            <ThemeProvider theme={theme}>
                <Provider reducer={reducer} initialState={this.state.maindata}>
                    {/* <GlobalStyles /> */}
                    {/* <Index data={this.state.maindata? this.state.maindata: ""}/> */}
                    <Index maindata={this.state.maindata}/>
                </Provider>
            </ThemeProvider>
        );
    }

    
    sendRequest = async () => {
        let url = playgrdURL;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
            "Content-Type": "text/plain"
            }
        };

        let response;
        await fetch(url, {
            method: 'GET',
            headers: {
            "Content-Type": "text/plain"
            }
        }).then(response => response.json())
        .then(data => {
            response = data;
        }).catch(error => {
            this.setState({error : error});
        });

        console.log('aaaa',response);

        this.setState({
            maindata: response,
        });
        
        // initialState = response;
    };

    async componentDidMount(){
       await this.sendRequest();
    }
}

export default FootballTeam;
