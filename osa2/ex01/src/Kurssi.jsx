import React from 'react'

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

export const Kurssi = ({kurssi}) => (
  <React.Fragment>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </React.Fragment>
);
