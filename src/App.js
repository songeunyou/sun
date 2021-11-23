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
    // console.log(e.clientX, e.clientY);
    let x = Math.floor(255 * (e.clientX / window.innerWidth));
    let y = Math.floor(255 * (e.clientY / window.innerHeight));

    setSky({
      position: 'relative',
      backgroundColor: `rgb(${0}, ${x}, ${y})`
    });

    setSun({
      position: 'absolute',
      width: '30px',
      height: '30px',
      top: e.clientY,
      left: e.clientX,
      backgroundColor: `rgb(${y}, ${x}, ${200})`,
      borderRadius: '20px'
    });
  }

  // console.log(sun);

  return (
    <div className="App">
      <div id="sky" style={sky}>
        <p>{sky.backgroundColor}</p>
        {/* <p>coordinates: {x}, {y}</p>*/}
        <div id="sun" style={sun}></div>
      </div>
    </div>
  );
}

export default App;
