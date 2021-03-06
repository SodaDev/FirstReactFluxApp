'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
                            <Link to="app">Home</Link>
                        </li>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        <li>
                            <Link to="authors">Authors</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;