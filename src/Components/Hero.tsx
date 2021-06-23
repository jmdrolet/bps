import {Grid, Typography} from '@material-ui/core';
import React from 'react';
import './Hero.css';

interface IHeroProps {
  logos: string[];
  welcome: string;
}

function Anchor(props: React.HTMLProps<HTMLAnchorElement>) {
  return <a href={props.href}>{props.value}</a>;
}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  return (
    <header className="App-header">
      <img src="//assetshare.basspro.com/content/dam/bps-general-assets/web/site-elements/images/Redesign/Header/bass-pro-logo-2x.png" alt="Bass Pro Shops Logo"></img>
    </header>
  );
};

export default Hero;
