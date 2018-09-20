import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({kurssi}) => (
  <h2>{kurssi}</h2>
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
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    },
  ];

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi =>
        <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
