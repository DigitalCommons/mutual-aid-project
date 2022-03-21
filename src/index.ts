import { webRun, fetchConfigs} from "sea-map/index";

// Re-export of ConfigData in sea-map/index above seems not to work,
// so import it directly from here:
import type { ConfigData } from  "sea-map/app/model/config_schema";


import * as about from "../config/about.html";

const config: ConfigData = {
  "namedDatasets" : ["mutual-aid"],
  "namedDatasetsVerbose" : ["Mutual-Aid Organisations"],
  "filterableFields" : [],
  "languages": ["EN"],
  "vocabularies": [
    { "endpoint": "http:\/\/dev.data.solidarityeconomy.coop:8890/sparql",
      "uris": {}
    }
  ],
  "showDatasetsPanel" : false,
  "showDirectoryPanel" : false,
  "htmlTitle" : "Mutual Aid",
  "tileUrl" : "https:/\/tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=3d5b23b8fe9c4a2a94a3df16f02f125a",
  "mapAttribution" :  "Maps &copy; <a href='http:/\/www.thunderforest.com'>Thunderforest</a> & &copy; <a href='http:/\/www.openstreetmap.org/copyright'>OpenStreetMap contributors</a> | Other data <a href='http:/\/creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a> | Powered by <a href='https:/\/www.geoapify.com/'>Geoapify</a>",
  "defaultLatLng": [50.84999, 4.39434]
};
const versions: ConfigData = {
  "variant": "mutual-aid-project",
  "timestamp": "2022-03-20T10:49:54.236Z",
  "gitcommit": "c4f851f-modified",
  "seaMapVersion": "1.3.1_816957a-modified-devxx"
};

const combinedConfig = { ...config, ...versions, aboutHtml: about } as ConfigData;

webRun(window, combinedConfig);

