'use strict';

var React = require('react');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;

var Authors = React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },
    componentWillMount: function(){
        AuthorStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        AuthorStore.removeChangeListener(this.onChange);
    },
    onChange: function(){
        this.setState({
            authors: AuthorStore.getAllAuthors()
        });
    },
    render: function(){
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add author </Link>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});

module.exports = Authors;