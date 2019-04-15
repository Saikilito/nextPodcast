import { Component, Fragment } from 'react';
import 'isomorphic-fetch';

import Error from './_error';
import Layout from '../containers/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

class Channel extends Component {
    static async getInitialProps({ query, res }){
        let idChannel = query.id;
        try{
          let [reqChannel, reqAudio, reqSeries] = await Promise.all([
              fetch(`https://api.audioboom.com/channels/${idChannel}`),
              fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
              fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
          ]);

          if( reqChannel.status >= 400){
            res.statusCode = reqChannel.status;

            return { channel:null, audioClips:null, series:null, statusCode:404}
          }
  
          let dataChannel = await reqChannel.json();
          let channel = dataChannel.body.channel;
  
          let dataAudios = await reqAudio.json();
          let audioClips = dataAudios.body.audio_clips;
  
          let dataSeries = await reqSeries.json();
          let series = dataSeries.body.channels;
          
          return { channel, audioClips, series, statusCode: 200 }
        }
        catch(err){
          return { channel:null, audioClips:null, series:null, statusCode:503}
        }
    }
    render(){
        const { channel, audioClips, series, statusCode } = this.props
        
        if(statusCode !== 200) return <Error statusCode={statusCode}/>
        return(
            <Fragment>
              <Layout title={ channel.title }>
                
                <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
                <h1>{ channel.title }</h1>
                
                { series.length > 0 &&
                  <Fragment>
                      <h2>Series</h2>
                      <ChannelGrid channels={ series }/>
                  </Fragment>
                }

                <h2>Ultimos Podcasts</h2>
                <PodcastList audioClips={ audioClips }/>
                

              </Layout>

        <style jsx>{`
                .banner {
                  width: 100%;
                  padding-bottom: 25%;
                  background-position: 50% 50%;
                  background-size: cover;
                  background-color: #aaa;
                }

                h1 {
                  font-weight: 600;
                  padding: 15px;
                }
                h2 {
                  padding: 5px;
                  font-size: 0.9em;
                  font-weight: 600;
                  margin: 0;
                  text-align: center;
                }
              `}</style>

            </Fragment>
        )
    }
}

export default Channel