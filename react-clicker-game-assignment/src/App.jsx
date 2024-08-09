import { useState, useEffect } from "react";
import UpgradeButton from "./components/UpgradeButton";
import "./index.css";

export default function App() {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(1);
  const [upgrades, setUpgrades] = useState([]); //store fetched upgrades

  useEffect(
    function () {
      const theInterval = setInterval(function () {
        setClicks((clicks) => clicks + cps);
      }, 1000);

      return () => clearInterval(theInterval);
    },
    [cps]
  );

  function incrementClicks() {
    setClicks(clicks + 1);
  }

  function buyUpgrade(cost, cpsIncrease) {
    if (clicks >= cost) {
      setClicks((clicks) => clicks - cost);
      setCps((clicks) => clicks + cpsIncrease);
    }
  }

  useEffect(() => {
    async function getUpgrades() {
      const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      );
      const data = await response.json();
      console.log("Fetched Upgrades:", data); // console log the fetched data to see if it works.....it works
      setUpgrades(data); //updates the upgrades which we fetch
    }
    getUpgrades();
  }, []);

  return (
    <div>
      <h1 className="header">Clicker Game</h1>

      <button onClick={incrementClicks} className="clickMe">
        Click Me!
      </button>

      <p className="clicks"> Clicks: {clicks}</p>
      <p className="cps">Clicks Per Second (CPS): {cps}</p>

      {upgrades.map((upgrade) => (
        <UpgradeButton
          className="upgrades"
          key={upgrade.id}
          upgrade={upgrade}
          buyUpgrade={() => buyUpgrade(upgrade.cost, upgrade.increase)}
          clicks={clicks}
        />
      ))}
    </div>
  );
}

// 0: {id: 1, name: 'Auto-CLicker, cost:100, increase: 1}
