//upgrde gives api detial e.g. name, cost, cps

// buyupgrade lets user buy when clicked using funciton in made in app.jsx. if user has enough points they can upgrade and clicks are tken away

//clicks sees is user has enough points. button doesnt work for them otherwise
// if (clicks >= cost)
//setClicks((curr) => curr - cost);
//setCps((curr) => curr + cpsIncrease);

export default function UpgradeButton({ upgrade, buyUpgrade, clicks }) {
  return (
    <button
      className="upgrades"
      onClick={buyUpgrade}
      disabled={clicks < upgrade.cost} // Disable if not enough clicks
    >
      Buy {upgrade.name} - {upgrade.cost} clicks / +{upgrade.increase} CPS
    </button>
  );
}
