import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div></div>;

class GoogleMaps extends Component {
    static defaultProps = {
        center: {
            lat: 35.341846,
            lng: 25.148254
        },
        zoom: 13
    };

    render() {
        return (
            <div className="map-wrap">
                <div style={{ minHeight: '28vw', minWidth: '50vw' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDW8uyQYPXDTEhT-8ITWQxMAZAthZfnL1o" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={35.341846}
                            lng={25.148454}
                            text={'Txt'}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default GoogleMaps;