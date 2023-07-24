import { ConfigData } from  "mykomap/app/model/config-schema";
import type { DataServices } from "mykomap/app/model/data-services";
import { getAddress, getEmail, getTwitter } from "mykomap/app/default-popup";
import about from "./about.html";
import * as versions from "./version.json";
import { Initiative } from "mykomap/src/map-app/app/model/initiative";

function customPopup(initiative: Initiative, model: DataServices): string {
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


export const config = new ConfigData({
  customPopup: customPopup,
  namedDatasets : ["mutual-aid"],
  namedDatasetsVerbose : ["Mutual-Aid Organisations"],
  filterableFields : [
  ],
  fields: {
    twitter: 'value',
    alphabetical: {
      type: 'custom',
      builder: (id, def, params) => {
        var name = params.name;
        return typeof name === 'string'? name.charAt(0) : '';
      },
    },
  },
  languages: ["EN"],
  vocabularies: [],
  dataSources: [
    {
      id: 'mutual-aid',
      label: 'Multia Aid',
      type: 'hostSparql',
    },
  ],
  showDatasetsPanel : false,
  showDirectoryPanel : false,
  htmlTitle : "Mutual Aid",
  tileUrl : "https:/\/tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=bb1cf9a95944474da77e513385d19680",
  mapAttribution :  "Maps &copy; <a href='http:/\/www.thunderforest.com'>Thunderforest</a> & &copy; <a href='http:/\/www.openstreetmap.org/copyright'>OpenStreetMap contributors</a> | Other data <a href='http:/\/creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a> | Powered by <a href='https:/\/www.geoapify.com/'>Geoapify</a>",
  aboutHtml: about,
  defaultLatLng: [50.84999, 4.39434],
  ...versions
});


