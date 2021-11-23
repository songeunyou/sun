import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './scss/App.scss';

function App() {

  // let [x, setX] = useState(0.0);
  // let [y, setY] = useState(0.0);
  // let [rgb, setrgb] = useState([0,0,0]);
  let [sky, setSky] = useState({});
  let [sun, setSun] = useState({});

  useEffect(() => {
    document.body.style.cursor = 'none';
    window.addEventListener("mousemove", handleMove);
  }, []);

  function handleMove(e) {
    let x = Math.floor(255 * (e.clientX / window.innerWidth));
    let y = Math.floor(255 * (e.clientY / window.innerHeight));

    let h = 205 + Math.floor(35 * (e.clientY / window.innerWidth));
    let s = 95 - Math.floor(40 * (e.clientY / window.innerWidth));
    let l = 70 - Math.floor(80 * (e.clientY / (window.innerHeight + 200)));

    if (h < 160 && h > 65) {
      h = 65;
    }

    setSky({
      backgroundColor: `hsl(${h}, ${s}%, ${l}%)`
    });

    let sun_h = 40 - Math.floor(40 * (e.clientY / window.innerWidth));
    let sun_s = 100;
    let sun_l = 100 - Math.floor(40 * (e.clientY / window.innerHeight));

    setSun({
      top: e.clientY,
      left: e.clientX,
      backgroundColor: `hsl(${sun_h}, ${sun_s}%, ${sun_l}%)`,
      boxShadow: `0px 0px 15px hsla(${sun_h}, ${sun_s}%, ${sun_l}%,0.6), 0px 0px 6px hsla(${sun_h}, ${sun_s}%, ${sun_l}%,0.6), 0px 0px 2px hsla(${sun_h}, ${sun_s}%, ${sun_l}%,0.6)`
    });
  }

  return (
    <div className="App">
      <div id="sky" style={sky}>
        <p>{sky.backgroundColor}</p>
        <p>{sun.backgroundColor}</p>

        <div className="horizon-fade"></div>
        <div className="sunrise-red-filter"></div>
        <div className="sunrise-glow"></div>
        <div className="sunrise-light"></div>

        <div id="sun" style={sun}></div>
      </div>
    </div>
  );
}

export default App;
