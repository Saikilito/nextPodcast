import { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';

class Layout extends Component {
    render(){
        return(
            <div>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <title>{ this.props.title }</title>
                </Head>

                <header><Link href="/"><a><strong> Podcast </strong></a></Link></header>
                
                { this.props.children }

                
                
                <style jsx>{`
                    header{
                        color:#fff;
                        background:#8756ca;
                        padding:15px;
                        text-align:center
                    }
                    header a {
                        color: #fff;
                        text-decoration:none;
                    }
                `}</style>
                <style jsx global>{`
                   body{
                       margin:0;
                       font-family: system-ui;
                       background: white;
                   }
                `}</style>
            </div>
        )
    }
}

export default Layout