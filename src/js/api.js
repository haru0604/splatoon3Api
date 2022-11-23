const apiUrl = "https://spla3.yuu26.com/api/schedule";
const coopUrl = "	https://spla3.yuu26.com/api/coop-grouping-regular/now";

async function load() {
  const data = await fetch(apiUrl);
  const obj = await data.json();

  const coopData = await fetch(coopUrl);
  const coopObj = await coopData.json();
  const result = await obj['result'];

  const regular = document.querySelector('#js-api-regular');
  const challenge = document.querySelector('#js-api-challenge');
  const open = document.querySelector('#js-api-open');
  const coop = document.querySelector('#js-api-coop');
  let stage = null;
  let weapons = null;
  let weapon = null;

  for (let i = 0; i < result.regular.length; i++) {
    const regularResult = result.regular;

    for (let j = 0; j < regularResult[j].stages.length; j++) {
      stage = regularResult[i].stages[j].name;
    }

    regular.innerHTML +=
      `<li class="stage__list">
    <div class="stage__date"> ${regularResult[i].start_time} </div>
    <h3 class="stage__name">${regularResult[i].rule['name']}</h3>
    <p class="stage__text stage__text--large">${stage}</p>
    </li>
    `;
  };

  for (let i = 0; i < result.bankara_challenge.length; i++) {
    const challengeResult = result.bankara_challenge;

    for (let j = 0; j < challengeResult[j].stages.length; j++) {
      stage = challengeResult[i].stages[j].name;
    }

    challenge.innerHTML +=
      `<li class="stage__list">
    <div class="stage__date"> ${challengeResult[i].start_time} </div>
    <h3 class="stage__name">${challengeResult[i].rule['name']}</h3>
    <p class="stage__text">${stage}</p>
    </li>
    `;
  };

  for (let i = 0; i < result.bankara_open.length; i++) {
    const openResult = result.bankara_open;

    for (let j = 0; j < openResult[j].stages.length; j++) {
      stage = openResult[i].stages[j].name;
    }

    open.innerHTML +=
      `<li class="stage__list">
    <div class="stage__date"> ${openResult[i].start_time} </div>
    <h3 class="stage__name">${openResult[i].rule['name']}</h3>
    <p class="stage__text">${stage}</p>
    </li>
    `;
  };


  for (let i = 0; i < coopObj.results.length; i++) {
    const coopResult = coopObj.results[i];

    for (let j = 0; j < coopResult.weapons.length; j++) {
      weapons = coopResult.weapons[j];

      weapon += `<li class="stage__weapon"><img src="${weapons.image}" alt=""></li>`
    }

    coop.innerHTML +=
      `<li class="stage__list">
    <div class="stage__date"> ${coopResult.start_time} </div>
    <div class="stage__image"><img src="${coopResult.stage.image}"></div>
    <p class="stage__text">${coopResult.stage.name}</p>
    <ul class = "stage__weapons">${weapon}</ul>
    </li>
    `;
  }
}



load();
