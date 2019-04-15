import React, { Component, Fragment } from 'react';
import fetch from 'isomorphic-fetch';

import Error from 'next/error';
import Layout from '../containers/Layout';
import ChannelGrid from '../components/ChannelGrid';

class Home extends Component {
  static async getInitialProps(){
    try{
      let req = await fetch('https://api.audioboom.com/channels/recommended');
      let { body: channels } = await req.json();
      
      return { channels, statusCode: 200  };

    }
    catch(err){
      return { channels: null, statusCode: 503}
    }
  } 
  render() {
    const { channels, statusCode } = this.props;
    console.log(statusCode);
    if( statusCode !== 200) return <Error statusCode={statusCode}/>
    
    return (
        <Layout title="Podcasts">
          <ChannelGrid channels={ channels }/>
        </Layout>
    );
  }
}

export default Home;
