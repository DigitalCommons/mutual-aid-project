import { webRun, fetchConfigs} from "sea-map/index";

// Re-export of ConfigData in sea-map/index above seems not to work,
// so import it directly from here:
import type { ConfigData } from  "sea-map/app/model/config_schema";
import type {
  Initiative, SseInitiative, CustomPropDef, InitiativeObj
} from "sea-map/app/model/sse_initiative";
import { getAddress, getEmail, getTwitter } from "sea-map/app/view/map/default_popup";
import about from "../config/about.html";
import * as versions from "../config/version.json";

function customPopup(initiative: Initiative, model: SseInitiative): string {
  const labels = model.getFunctionalLabels();
  let popupHTML = `
    <div class="sea-initiative-details">
      <h2 class="sea-initiative-name">${initiative.name}</h2>
      <p>${initiative.desc || ''}</p>
    </div>

    <div class="sea-initiative-contact">
      <h3>${labels.contact}</h3>
      ${getAddress(initiative)}
      
      <div class="sea-initiative-links">
        ${getEmail(initiative)}
        ${getTwitter(initiative)}
      </div>
    </div>
  `;
  
  return popupHTML;
}


const config: ConfigData = {
  customPopup: customPopup,
  namedDatasets : ["mutual-aid"],
  namedDatasetsVerbose : ["Mutual-Aid Organisations"],
  filterableFields : [
    'alphabetical',
  ],
  fields: {
    twitter: 'value',
    alphabetical: {
      type: 'custom',
      calling: (id, def, params) => {
        return params.name.charAt(0);
      },
    },
  },
  languages: ["EN"],
  vocabularies: [
    { "endpoint": "http:\/\/dev.data.solidarityeconomy.coop:8890/sparql",
      "uris": {}
    }
  ],
  showDatasetsPanel : true,
  showDirectoryPanel : true,
  htmlTitle : "Mutual Aid",
  tileUrl : "https:/\/tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=bb1cf9a95944474da77e513385d19680",
  mapAttribution :  "Maps &copy; <a href='http:/\/www.thunderforest.com'>Thunderforest</a> & &copy; <a href='http:/\/www.openstreetmap.org/copyright'>OpenStreetMap contributors</a> | Other data <a href='http:/\/creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a> | Powered by <a href='https:/\/www.geoapify.com/'>Geoapify</a>",
  defaultLatLng: [50.84999, 4.39434]
};

const combinedConfig = { ...config, ...versions, aboutHtml: about } as ConfigData;

webRun(window, combinedConfig);

