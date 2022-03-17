import { webRun, fetchConfigs } from "sea-map/index"

fetchConfigs()
    .then(combinedConfig => webRun(window, combinedConfig));
