import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './scss/App.scss';

// scale value to keep colors consistent regardless of window height
const scale =  window.innerHeight / 760;

function skyCalc(x, y) {
  let h = 205 + Math.floor(10 * (y / window.innerHeight));
  let s = 95 - Math.floor(30 * (y / (window.innerHeight + 500*scale)));
  let l = 70 - Math.floor(85 * (y / (window.innerHeight + 300*scale)));

  if (h < 160*scale && h > 65*scale) {
    h = 65;
  }

  return `hsl(${h}, ${s}%, ${l}%)`
}

function redCalc(x, y) {
  let h = 200 - Math.floor(320 * (y / window.innerHeight));
  let s = 40 + Math.floor(40 * (y / (window.innerHeight + 500*scale)));
  let l = 90 - Math.floor(100 * (y / (window.innerHeight + 300*scale)));

  return `${h}, ${s}%, ${l}%`
}

function sunCalc(x, y) {
  let h = 40 - Math.floor(40 * (y / (window.innerHeight - 180*scale)));
  let s = 100;
  let l = 100 - Math.floor(40 * (y / (window.innerHeight - 180*scale)));

  return `${h}, ${s}%, ${l}%`
}

function sunHorizonCalc(x, y) {
  let h = 40 - Math.floor(25 * (y / (window.innerHeight - 340*scale)));
  let s = 100;
  let l = 90 - Math.floor(70 * (y / window.innerHeight));
  let a = Math.floor(100 * Math.sin(2.2 * Math.PI * (y / window.innerHeight) - 800) + 110) / 100;

  return `${h}, ${s}%, ${l}%, ${a}`
}

function horizonCalc(x, y) {
  let h = 205 + Math.floor(35 * (y / window.innerWidth));
  let s = 100;
  let l = 90 - Math.floor(70 * (y / window.innerHeight));
  let a = 1;

  return `${h}, ${s}%, ${l}%, ${a}`
}

function App() {
  let [sky, setSky] = useState({});
  let [sun, setSun] = useState({});
  let [sunHorizon1, setSunHorizon1] = useState({});
  let [sunHorizon2, setSunHorizon2] = useState({});
  let [sunHorizon3, setSunHorizon3] = useState({});
  let [sunHorizon4, setSunHorizon4] = useState({});
  let [horizon, setHorizon] = useState({});
  let [redFilter, setRedFilter] = useState({});

  useEffect(() => {
    document.body.style.cursor = 'none';
    window.addEventListener("mousemove", handleMove);
  }, []);

  function handleMove(e) {
    let x = Math.floor(255 * (e.clientX / window.innerWidth));
    let y = Math.floor(255 * (e.clientY / window.innerHeight));

    setSky({
      backgroundColor: skyCalc(e.clientX, e.clientY)
    });

    let sunColor = sunCalc(e.clientX, e.clientY);
    let sunHorizonColor = sunHorizonCalc(e.clientX, e.clientY);
    let horizonColor = horizonCalc(e.clientX, e.clientY);
    let redColor = redCalc(e.clientX, e.clientY);

    let glowBottom = (e.clientY * 0.05) - (window.innerHeight * 0.02);
    // let redFilterOpacity = e.clientY / window.innerHeight;
    let redFilterOpacity = 1;

    setSun({
      top: e.clientY,
      left: e.clientX,
      backgroundColor: `hsl(${sunColor})`,
      boxShadow: `0px 0px 25px hsla(${sunColor},1), 0px 0px 20px hsla(${sunColor},1), 0px 0px 15px hsla(${sunColor},1), 0px 0px 10px hsla(${sunColor},1), 0px 0px 6px hsla(${sunColor}, 1), 0px 0px 4px hsla(${sunColor},1), 0px 0px 2px hsla(${sunColor},1)`
    });

    setHorizon({
      boxShadow: `0px 0px 1000px hsla(${horizonColor}), 0px 0px 10000000px hsla(${horizonColor})`
    });

    setRedFilter({
      opacity: redFilterOpacity,
      background: `linear-gradient(hsla(${redColor},0), hsla(${redColor}, 1))`
    });

    setSunHorizon1({
      left: e.clientX - 140,
      bottom: glowBottom,
      boxShadow: `0px 0px 5000px hsla(${sunHorizonColor}), 0px 0px 5000px hsla(${sunHorizonColor}), 0px 0px 5000px hsla(${sunHorizonColor})`
    });

    setSunHorizon2({
      left: e.clientX - 280,
      bottom: glowBottom,
      boxShadow: `0px 0px 1000px hsla(${sunHorizonColor}), 0px 0px 1000px hsla(${sunHorizonColor})`
    });

    setSunHorizon3({
      left: e.clientX - 490,
      bottom: glowBottom,
      boxShadow: `0px 0px 800px hsla(${sunHorizonColor})`
    });

    setSunHorizon4({
      left: e.clientX - 735,
      bottom: glowBottom,
      boxShadow: `0px 0px 800px hsla(${sunHorizonColor})`
    });
  }
  return (
    <div className="App">
      <div id="sky" style={sky}>
        <div className="earth"/>
        <div className="earth-glow" style={horizon}/>

        <div className="horizon-glow-1" style={sunHorizon1}/>
        <div className="horizon-glow-2" style={sunHorizon2}/>
        <div className="horizon-glow-3" style={sunHorizon3}/>
        <div className="horizon-glow-4" style={sunHorizon4}/>
        <div className="red-filter" style={redFilter}/>
        <div className="sunrise-light"/>

        <div id="sun" style={sun}></div>
      </div>
      <p className="text">You are the sun!</p>
    </div>
  );
}

export default App;
