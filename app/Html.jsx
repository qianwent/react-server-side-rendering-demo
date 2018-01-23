/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {connectToStores, provideContext} from 'fluxible-addons-react';
@provideContext class HtmlComponent extends React.Component {
    render() {
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <title>React Server Side Demo</title>
                <meta name="Keywords" content="React Server Side Demo"/>
                <meta name="Description" content="React Server Side Demo"/>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                <base href="/"/>

                <link rel="stylesheet" href="/build/client.css"/>
            </head>

            <body>
            <div id={this.props.uid} dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/build/client.js" defer></script>
            </html>
        )
    }
}

export default HtmlComponent;
