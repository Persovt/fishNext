import { AnyRecordWithTtl } from "dns";
import { ElementRef } from "react";

function tank(tank: any) {
  var myoptions: any, gui: any;
  const fishes = ["🐟 🐠 🐡", "🐡", "🐠", "🐟", "🐟 🐠 🦑 🐙"];

  var WINDOW_MIN: number;
  const MIN_THRESHOLD = 640;
  var timeouts: any = [];

  generateControls();
  initializeTank();

//   window.addEventListener("resize", () => {
//     initializeTank();
//   });

  

  /*Fish functions*/
  function initializeTank() {
    WINDOW_MIN = Math.min(tank.clientHeight, tank.clientWidth);
    generateFishTank();
    
  }

  function generateFishTank() {
    clearTimeouts();
    tank.innerHTML = "";
    for (let i = 0; i < myoptions.NumFishGroups; i++) {
      let species = pick(myoptions.FishSpecies.split(" "));
      let numFish = 1;
      if (
        !myoptions.SingleFishOnly &&
        Math.random() * 100 > 100 - myoptions.PercentSchools
      ) {
        numFish = getRandomInt(1, myoptions.MaxPerSchool);
      }
      let hueShift = myoptions.ColorChanging ? getRandomInt(0, 360) : 0;

      let school = generateSchool(numFish, species, hueShift);
      tank.appendChild(school);
      loop(school);
    }
  }

  function generateSchool(numFish: number, species: any, hueShift: any) {
    //school position and area
    let root = document.createElement("div");
    root.setAttribute("class", "school");
    root.style.width = `${getRandomFloat(100, 1000)}px`;
    root.style.height = `${getRandomFloat(100, 700)}px`;
    root.style.left = `${getRandomFloat(0, 100)}%`;
    root.style.top = `${getRandomFloat(0, 100)}%`;

    //fish sizes
    let maxFishSize = WINDOW_MIN < MIN_THRESHOLD ? 50 : 80;
    let minFishSize = WINDOW_MIN < MIN_THRESHOLD ? 5 : 10;
    let staticSize = getRandomInt(minFishSize, maxFishSize / 2);
    let allSameSize = numFish > 1 && Math.random() > 0.7;

    //size and color the fish and position them randomly in the school
    for (let i = 0; i < numFish; i++) {
      let fishPos = [getRandomFloat(0, 100), getRandomFloat(0, 100)];
      let size = allSameSize
        ? staticSize
        : getRandomInt(minFishSize, maxFishSize);
      let fish = generateFish(fishPos, hueShift, size, species);
      root.appendChild(fish);
    }
    return root;
  }

  function loop(this: any, school: any) {
    let timeout: any = school.getAttribute("data-timeout");
    clearTimeout(timeout);
    let minInterval =
      myoptions.SwimSpeed == "Slow"
        ? 10000
        : myoptions.SwimSpeed == "Moderate"
        ? 5000
        : 3000;
    let maxInterval =
      myoptions.SwimSpeed == "Slow"
        ? 30000
        : myoptions.SwimSpeed == "Moderate"
        ? 20000
        : 10000;
    let nextCall = getRandomInt(minInterval, maxInterval);
    moveSchool(school, nextCall);
    timeout = setTimeout(loop.bind(this, school), nextCall);
    timeouts.push(timeout);
    school.setAttribute("data-timeout", timeout);
  }

  function moveSchool(school: any, nextCall: number) {
    //move the school as a whole
    let currentX = parseInt(school.getAttribute("data-x")) || 0;
    let moveMoreVertically = isSquid(school.querySelector(".fish").textContent);
    let newX = moveMoreVertically
      ? getRandomFloat(-tank.clientWidth / 4, tank.clientWidth / 4)
      : getRandomFloat(-tank.clientWidth, tank.clientWidth);
    let newY = moveMoreVertically
      ? getRandomFloat(-tank.clientHeight, tank.clientHeight)
      : getRandomFloat(-tank.clientHeight / 4, tank.clientHeight / 4);

    const isRight = newX > currentX;
    let easing = Math.random() > 0.5 ? "ease" : "ease-in-out";
    school.style.transition = `transform ${nextCall}ms ${easing}`;
    school.style.transform = `translate(${newX}px, ${newY}px)`;
    school.setAttribute("data-x", newX);

    //correct fish direction if necessary and for >1 fish, shift them around a little in the school
    let maxTranslationDistance = WINDOW_MIN < MIN_THRESHOLD ? 50 : 100;
    [...school.querySelectorAll(".fish")].forEach((fish) => {
      let direction = fish.querySelector(".direction");
      direction.style.transform = `scaleX(${isRight ? -1 : 1})`;
      direction.style.transition = `transform ${getRandomFloat(0.2, 0.6)}s`;
      if (school.children.length > 1) {
        let translateX = getRandomFloat(
          -maxTranslationDistance,
          maxTranslationDistance
        );
        let translateY = getRandomFloat(
          -maxTranslationDistance,
          maxTranslationDistance
        );
        fish.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        let easing = Math.random() > 0.5 ? "ease" : "ease-in-out";
        fish.style.transition = `all ${nextCall}ms ${easing}`;
      }
    });
  }

  function generateFish(pos: any, hueShift: any, size: number, icon: any) {
    let htm = `<div class="direction">${icon}</div>`;
    let f = document.createElement("div");
    f.setAttribute("class", "fish");
    f.style.filter = `hue-rotate(${hueShift}deg)`;
    f.style.left = `${pos[0]}%`;
    f.style.top = `${pos[1]}%`;
    f.style.fontSize = `${size}px`;
    f.innerHTML = htm;
    return f;
  }

  /*DAT.GUI表示*/
  

  function generateControls() {
    myoptions = {}
    myoptions.Presets = "Ocean Mix";
    myoptions.NumFishGroups = "20";
    myoptions.SingleFishOnly = false;
    myoptions.MaxPerSchool = "6";
    myoptions.ColorChanging = true;
    myoptions.PercentSchools = "25";
    myoptions.SwimSpeed = "Moderate";
    myoptions.FishSpecies = "🐟 🐠 🐡";

  }

  function setValue() {
    generateFishTank();
  }

  
  /*END GUI表示*/

  /*HELPERS*/
  function pick(arr: []) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function isMobile() {
    let mobile = window.matchMedia(
      `only screen and (max-width: ${MIN_THRESHOLD}px), only screen and (max-height:${MIN_THRESHOLD}px)`
    ).matches;
    return (
      mobile ||
      navigator.userAgent.indexOf("Firefox") != -1 ||
      navigator.userAgent.indexOf("Silk") != -1
    );
  }

  function clearTimeouts() {
    for (var i = 0; i < timeouts.length; i++) {
      window.clearTimeout(timeouts[i]);
    }
    timeouts = [];
  }

  

  function isSquid(letter: string) {
    return /[\u{1f991}\u{1f419}]/u.test(letter);
  }
}
export default tank;
