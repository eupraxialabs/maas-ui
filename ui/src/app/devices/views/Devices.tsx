import { Route, Switch } from "react-router-dom";

import DeviceDetails from "./DeviceDetails";
import DeviceList from "./DeviceList";

import NotFound from "app/base/views/NotFound";
import devicesURLs from "app/devices/urls";

const Devices = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={[devicesURLs.devices.index]}>
        <DeviceList />
      </Route>
      <Route
        exact
        path={[
          devicesURLs.device.configuration(null, true),
          devicesURLs.device.index(null, true),
          devicesURLs.device.network(null, true),
          devicesURLs.device.summary(null, true),
        ]}
      >
        <DeviceDetails />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Devices;
