import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import EditDisk from "./EditDisk";

import { DiskTypes } from "app/store/types/enum";
import {
  machineDetails as machineDetailsFactory,
  machineDisk as diskFactory,
  machineState as machineStateFactory,
  machineStatus as machineStatusFactory,
  machineStatuses as machineStatusesFactory,
  rootState as rootStateFactory,
} from "testing/factories";
import { submitFormikForm } from "testing/utils";

const mockStore = configureStore();

describe("EditDisk", () => {
  it("shows filesystem fields if the disk is not the boot disk", () => {
    const disk = diskFactory({ is_boot: false, type: DiskTypes.PHYSICAL });
    const state = rootStateFactory({
      machine: machineStateFactory({
        items: [
          machineDetailsFactory({
            disks: [disk],
            system_id: "abc123",
          }),
        ],
        statuses: machineStatusesFactory({
          abc123: machineStatusFactory(),
        }),
      }),
    });
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <EditDisk closeExpanded={jest.fn()} disk={disk} systemId="abc123" />
      </Provider>
    );

    expect(wrapper.find("FilesystemFields").exists()).toBe(true);
  });

  it("correctly dispatches an action to edit a disk", () => {
    const disk = diskFactory({ type: DiskTypes.PHYSICAL });
    const state = rootStateFactory({
      machine: machineStateFactory({
        items: [
          machineDetailsFactory({
            disks: [disk],
            system_id: "abc123",
          }),
        ],
        statuses: machineStatusesFactory({
          abc123: machineStatusFactory(),
        }),
      }),
    });
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <EditDisk closeExpanded={jest.fn()} disk={disk} systemId="abc123" />
      </Provider>
    );

    submitFormikForm(wrapper, {
      tags: ["tag1", "tag2"],
    });

    expect(
      store.getActions().find((action) => action.type === "machine/updateDisk")
    ).toStrictEqual({
      meta: {
        method: "update_disk",
        model: "machine",
      },
      payload: {
        params: {
          block_id: disk.id,
          system_id: "abc123",
          tags: ["tag1", "tag2"],
        },
      },
      type: "machine/updateDisk",
    });
  });
});
