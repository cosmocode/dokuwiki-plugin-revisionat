jQuery(function() {
    'use strict';

    /**
     * Simplified version to get the value of a search param
     *
     * Should work in IE 11 and above
     *
     * @param {string} paramName The param to return
     * @param {string} [queryString] the querystring from which to return the param's value
     * @return {string} the param's value
     */
    function getQueryParam(paramName, queryString) {
        queryString = queryString || window.location.search;
        if (typeof URLSearchParams !== 'function') {
            // extra handling for IE and Edge, see https://caniuse.com/#feat=urlsearchparams
            queryString = queryString.substr(1);
            var query = {};
            queryString.split('&').map(function (searchParamString) {
                var searchParamArray = searchParamString.split('=');
                query[searchParamArray[0]] = searchParamArray[1];
            });
            if (typeof query[paramName] === 'string') {
                return query[paramName];
            }
            return '';
        }

        var searchParams = new URLSearchParams(queryString);
        return searchParams.get(paramName);
    }

    var doParam = getQueryParam('do');


    if (['revisions', 'diff'].indexOf(doParam) === -1) {
        return;
    }
    jQuery('a').each(function (index, element) {

        var $elem = jQuery(element);
        var href = $elem.attr('href');
        $elem.attr('href', href.replace(/rev(=\d{10})/, 'at$1'));
    })

});
