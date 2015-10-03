'use strict';

var React = require('react');
var AuthorActions = require('../../actions/authorActions');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');


var AuthorList = React.createClass({
    deleteAuthor: function(id, event){
        event.preventDefault();
        AuthorActions.deleteAuthor(id),
        toastr.success('author removed');
    },
    render: function(){
        var createAuthorRow = function(author){
            return (
                <tr key={author.id}>
                    <td>
                        <Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link>
                    </td>
                    <td>{author.firstName} {author.lastName}</td>
                    <td>
                        <a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a>
                    </td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorList;