'use strict';

var React = require('react');

var Header = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="img/react-logo.svg" alt="React logo" className="img-responsive" style={{maxHeight: '100%'}}/>
                    </a>
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/#about">About</a>
                        </li>
                        <li>
                            <a href="/#authors">Authors</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;