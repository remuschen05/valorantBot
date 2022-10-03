import 'dotenv/config';

import axios from 'axios';

const config = {
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  },
};

export const getValorantStatus = async () => {
  const url = `https://na.api.riotgames.com/val/status/v1/platform-data`;
  try {
    const resp = await axios.get(url, config);
    if (
      resp.data.maintenances.length === 0 &&
      resp.data.incidents.length === 0
    ) {
      return `Valorant is online and functioning with 0 issues.`;
    } else {
      return `Valorant is online and functioning with ${
        resp.data.maintenances + resp.data.incidents
      } issues`;
    }
  } catch (err) {
    console.log(err);
  }
};

const getAccountPUUID = async (gameName, tagLine) => {
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
  try {
    const resp = await axios.get(url, config);
    return resp.data.puuid;
  } catch (err) {
    console.log(err);
  }
};

const getCurrentAct = async () => {
  const url = `https://na.api.riotgames.com/val/content/v1/contents`;
  try {
    const resp = await axios.get(url, config);
    let actsList = resp.data.acts;
    for (let i = 0; i < actsList.length; i++) {
      if (actsList[i].isActive && actsList[i].type === 'act') {
        return actsList[i].id;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

let accountPUUID = await getAccountPUUID('Foamis', 'NA1');
let currentAct = await getCurrentAct();
let valorantStatus = await getValorantStatus();
