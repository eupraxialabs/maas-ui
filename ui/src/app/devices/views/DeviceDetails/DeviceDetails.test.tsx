import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import configureStore from "redux-mock-store";

import DeviceDetails from "./DeviceDetails";

import deviceURLs from "app/devices/urls";
import { actions as deviceActions } from "app/store/device";
import type { RootState } from "app/store/root/types";
import {
  device as deviceFactory,
  deviceState as deviceStateFactory,
  rootState as rootStateFactory,
} from "testing/factories";

const mockStore = configureStore();

describe("DeviceDetails", () => {
  const device = deviceFactory({ system_id: "abc123" });
  let state: RootState;

  beforeEach(() => {
    state = rootStateFactory({
      device: deviceStateFactory({
        items: [device],
        loaded: true,
        loading: false,
      }),
    });
  });

  it("gets and sets the device as active", () => {
    const store = mockStore(state);
    mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: deviceURLs.device.index({ id: device.system_id }) },
          ]}
        >
          <Route
            exact
            path={deviceURLs.device.index(null, true)}
            component={() => <DeviceDetails />}
          />
        </MemoryRouter>
      </Provider>
    );

    const expectedActions = [
      deviceActions.get(device.system_id),
      deviceActions.setActive(device.system_id),
    ];
    const actualActions = store.getActions();
    expectedActions.forEach((expectedAction) => {
      expect(
        actualActions.find(
          (actualAction) => actualAction.type === expectedAction.type
        )
      ).toStrictEqual(expectedAction);
    });
  });

  it("unsets active device and cleans up when unmounting", () => {
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: deviceURLs.device.index({ id: device.system_id }) },
          ]}
        >
          <Route
            exact
            path={deviceURLs.device.index(null, true)}
            component={() => <DeviceDetails />}
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.unmount();

    const expectedActions = [
      deviceActions.setActive(null),
      deviceActions.cleanup(),
    ];
    const actualActions = store.getActions();
    expectedActions.forEach((expectedAction) => {
      expect(
        actualActions.find(
          (actualAction) =>
            actualAction.type === expectedAction.type &&
            // Check payload to differentiate "set" and "unset" active actions
            actualAction.payload?.params === expectedAction.payload?.params
        )
      ).toStrictEqual(expectedAction);
    });
  });

  it("displays a message if the device does not exist", () => {
    state.device.items = [];
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            { pathname: deviceURLs.device.index({ id: device.system_id }) },
          ]}
        >
          <Route
            exact
            path={deviceURLs.device.index(null, true)}
            component={() => <DeviceDetails />}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find("[data-testid='not-found']").exists()).toBe(true);
  });
});
