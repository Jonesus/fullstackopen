import React from 'react';
import ReactDOM from 'react-dom';
import { Kurssi } from './Kurssi';

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
