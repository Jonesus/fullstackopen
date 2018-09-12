import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({kurssi}) => (
  <h1>{kurssi}</h1>
);

const Sisalto = ({osat}) => osat.map(
  rivi => <Osa osa={rivi.nimi} tehtava={rivi.tehtavia} />
);

const Osa = ({osa, tehtava}) => (
  <p>{osa} {tehtava}</p>
);

const Yhteensa = ({osat}) => (
    <p>{`yhteensä ${osat[0].tehtavia + osat[1].tehtavia + osat[2].tehtavia} tehtävää`}</p>
);

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
      },
    ],
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
