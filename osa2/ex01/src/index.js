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
    <p>{`yhteensä ${osat.reduce((acc, current) => acc + current.tehtavia, 0)} tehtävää`}</p>
);

const Kurssi = ({kurssi}) => (
  <React.Fragment>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </React.Fragment>
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
      {
        nimi: 'Redux',
        tehtavia: 7,
      }
    ],
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
