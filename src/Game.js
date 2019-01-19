import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types'

const Stars = (props) => {
    let StarArray = [];
    for (let i = 0; i < props.numberOfStars; i++) {
        StarArray.push(<span key={i} className="fa fa-star"></span>);
    }
    return (
        <div className="col-lg-3 offset-lg-1 col-sm-10 offset-sm-1 col-md-4 offset-md-0">{StarArray}</div>
    );
};

const Button = (props) => {
    let classNames = ['equal-mark', 'fas', props.isCorrent === true ? 'fa-check' : props.isCorrent === false ? 'fa-times' : 'fa-equals'];
    return(
        <div className="col-lg-3 col-md-3 col-sm-10 text-center">
            <i className={classNames.join(' ')} onClick={(e) => props.handleEqual(e)}></i>
            <br />
            <i className="fas fa-sync-alt" onClick={(e) => props.handleRefresh(e)}>{props.refreshLeft}</i>
        </div>
    );
};

const Anwser = (props) => {
    const selectedNmbs = [];
    for (let i = 0; i < props.selectedNumbers.length; i++) {
        selectedNmbs.push(<span key={props.selectedNumbers[i]} className="num selected" onClick={() => props.handleUnpick(props.selectedNumbers[i])}>{props.selectedNumbers[i]}</span>);
    }
    return(
        <div className="col-lg-4 col-md-5 col-sm-12">{selectedNmbs}</div>
    );
};

const NumbersPool = (props) => {
    let numberPool = [];
    for (let i = 1; i < 10; i++) {
        let classNames = ['num'];
        classNames.push(props.usedNumbers.includes(i) ? 'used': props.selectedNumbers.includes(i) ? 'selected' : '');
        numberPool.push(<span className={classNames.join(' ')} key={i} onClick={classNames.includes('used') ? null : classNames.includes('selected') ? () => props.handleUnpick(i) : () => props.handlePick(i)}>{i}</span>);
    }
    return (
        <div className="col-12 text-center">{numberPool}</div>
    );
};

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            selectedNumbers: [],
            usedNumbers:[],
            refreshLeft: 10,
            resultMsg: null,
            isCorrent: null
        };
    }

    handleEqual = (event) => {
        let result = this.state.selectedNumbers.reduce((a, b) => a + b, 0) === this.state.numberOfStars ? true : false;
        this.setState((prevState) => {
            return result === true ? (prevState.usedNumbers.length === 8 ? {
                resultMsg: 'Brilliant!',
                selectedNumbers: [],
                usedNumbers: [...prevState.usedNumbers, ...prevState.selectedNumbers],
            } : {
                numberOfStars: Math.floor(Math.random() * 9) + 1,
                selectedNumbers: [],
                usedNumbers: [...prevState.usedNumbers, ...prevState.selectedNumbers],
                isCorrent: true
            }) : {
                isCorrent: false
            }
        });
    }

    handleRefresh = (event) => {
        this.setState((prevState) => {
            return prevState.refreshLeft === 1 ? {
                resultMsg: 'Game Over!'
            } : {
                numberOfStars: Math.floor(Math.random() * 9) + 1,
                refreshLeft: prevState.refreshLeft - 1,
                selectedNumbers: []
            }
        });
    }

    handlePick = (props) => {
        this.setState((prevState) => {
            return {
                isCorrent: null,
                selectedNumbers: [...prevState.selectedNumbers, props]
            }
        });
    }

    handleUnpick = (props) => {
        this.setState((prevState) => {
            return {
                selectedNumbers: prevState.selectedNumbers.filter(element => element !== props)
            }
        });
    }

    handleReplay = () => {
        this.setState({
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            selectedNumbers: [],
            usedNumbers:[],
            refreshLeft: 10,
            resultMsg: null,
            isCorrent: null
        })
    }
    
    render() {
        return (
            <div className="container">
                {
                    this.state.resultMsg ? 
                    <React.Fragment>
                        <h1 className="text-center">{this.state.resultMsg}</h1>
                        <div className="text-center replay" onClick={(e) => this.handleReplay(e)}><i className="fas fa-recycle"></i>Play again...</div>
                    </React.Fragment>
                    :
                    <div>
                        <div className="row">
                            <Stars numberOfStars={this.state.numberOfStars} />
                            <Button handleEqual={this.handleEqual} refreshLeft={this.state.refreshLeft} handleRefresh={this.handleRefresh} isCorrent={this.state.isCorrent} resultMsg={this.state.resultMsg} />
                            <Anwser selectedNumbers={this.state.selectedNumbers} handleUnpick={this.handleUnpick} />
                        </div>
                        <div className="row">
                            <NumbersPool selectedNumbers={this.state.selectedNumbers} usedNumbers={this.state.usedNumbers} handlePick={this.handlePick} handleUnpick={this.handleUnpick} />
                        </div>
                    </div>
                }
            </div>
        );
    }
}
