'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionsTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitializeActions = {
    initApp: function(){
        Dispatcher.dispatch({
            actionType: ActionsTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;