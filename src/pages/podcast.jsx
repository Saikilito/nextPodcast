import React, { Component } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-fetch';

import Error from 'next/error';
import Layout from '../containers/Layout';

class Podcast extends Component {
    static async getInitialProps({ query, res }){
        let id = query.id ;
        
        try{
          let fetchClip = await fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`);
          
          if(fetchClip.status >= 400){
            res.statusCode = fetchClip ;
            return {clip:null, statusCode:404}
          }

          let clip = (await fetchClip.json()).body.audio_clip;
          
          return {clip, statusCode:200};
        }
        catch(err){
          res.statusCode = 503;
          return { clip: null, statusCode: 503}
        }
    }
    render() {
        const { clip, statusCode } = this.props;
        console.log(this.props);

        if(statusCode !== 200) return <Error statusCode={statusCode}/>
        // else return <h2>HOla mamii</h2>
        const image = clip.urls.image || clip.channel.urls.logo_image.original;
        console.log(image)
        return (
            <div>
                <Layout title={ clip.channel.title }>
                
                <div className='modal'>
                    <div className='clip'>
                      <nav>
                        <Link href={`/channel?id=${clip.channel.id}`}>
                          <a className='close'>&lt; Volver</a>
                        </Link>
                      </nav>

                      <picture>
                        <img src={image} alt="Image"/>
                        {/* <div style={{ backgroundImage: `url(${image})` }} /> */}
                      </picture>

                      <div className='player'>
                        <h3>{ clip.title }</h3>
                        <h6>{ clip.channel.title }</h6>
                        <audio controls autoPlay={true}>
                          <source src={clip.urls.high_mp3} type='audio/mpeg' />
                        </audio>
                      </div>
                    </div>
                </div>

                </Layout>

      <style jsx>{`
        picture img{
          height:100vh;
          width: auto;
        }
        nav {
          background: none;
        }
        nav a {
          display: inline-block;
          padding: 15px;
          color: white;
          cursor: pointer;
          text-decoration: none;
        }
        .clip {
          display: flex;
          height: 100%;
          flex-direction: column;
          background: #8756ca;
          color: white;
        }
        picture {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1;
          flex-direction: column;
          width: auto;
          padding: 10%;
        }
        picture div {
          width: 100%;
          height: 100%;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .player {
          padding: 30px;
          background: rgba(0,0,0,0.3);
          text-align: center;
        }
        h3 {
          margin: 0;
        }
        h6 {
          margin: 0;
          margin-top: 1em;
        }
        audio {
          margin-top: 2em;
          width: 100%;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
            </div>
        );
    }
}

export default Podcast;
