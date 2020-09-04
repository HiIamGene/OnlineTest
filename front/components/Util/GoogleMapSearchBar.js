import React from 'react'
import Head from 'next/head'
import PlacesAutocomplete from 'react-places-autocomplete';
import {Input} from 'reactstrap'
import _ from 'lodash'

  class GoogleMapSearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: props.value };
    }
  
    handleChange = address => {
      this.setState({ address });
      if(typeof(this.props.value) === 'function') {
        this.props.value(address)
      }
      if(typeof(this.props.onHandleChange) === 'function') {
        this.props.onHandleChange(address)
      }
    };
  
    handleSelect = address => {
        this.props.onChangeLocation(address)
    };
    componentDidUpdate(prevProps){
      if(this.props.value != prevProps.value){
        this.setState({
          address : this.props.value
        })
      }
    }
    render() {
     
      const { name , value, placeholder, maxLength, className } = this.props
      return (       
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input
                {...getInputProps({
                  placeholder: placeholder,
                  className: className,
                  maxLength: maxLength
                })}
              />
              <div style={{borderRadius : "5px",borderBottom : !_.isEmpty(suggestions) ? "1px solid black" : "" , borderLeft : !_.isEmpty(suggestions) ? "1px solid black" : "" , borderRight : !_.isEmpty(suggestions) ? "1px solid black" : ""}} >
                {loading && <div>Loading...</div> && false}
                {suggestions.map(suggestion => {
                  /* const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                    
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  ); */
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>  
      );
    }
  }

  export default GoogleMapSearchBar