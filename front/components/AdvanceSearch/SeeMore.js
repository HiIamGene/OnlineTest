import { Component } from "react";
import { compose } from "recompose";

function simulateNetworlRequest() {
    return new Promise(resolve => setTimeout(resolve, 2500))
}

class LoadingButton extends Component{
    constructor(props, context){
        super(props, context)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            isLoading: false
        }
    }

    handleClick(){
        this.setState({isLoading: true}, () => {
            simulateNetworlRequest().then(() => {
                this.setState({isLoading: false})
            })
        })
    }

    render(){
        const{isLoading} = this.state
        return(
            <div className={'button-see-more'}>
                <button
                    type={'button'}
                    variant='primary'
                    disabled={isLoading}
                    onClick={!isLoading ? this.handleClick : null}
                    value={'see-more-button'}
                >
                    {isLoading ? 'Loading . . .' : 'See More'}
                </button>
                <style jsx>
                    {`
                        button{
                            width: 100%;
                            font-family: "Cloud", sans-serif;
                            font-size: 15px;
                            color: #228cc3;
                            background-color: #e6e6e6;
                            border-color: #fff;
                            border-radius: 10px;
                            height: 50%;
                        }
                    `}
                </style>
            </div>
        )
    }
}

export default compose(

)(LoadingButton)
