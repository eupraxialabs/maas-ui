import { Route, Switch } from "react-router-dom";

import KVMList from "./KVMList";
import LXDClusterDetails from "./LXDClusterDetails";
import LXDSingleDetails from "./LXDSingleDetails";
import VirshDetails from "./VirshDetails";

import NotFound from "app/base/views/NotFound";
import kvmURLs from "app/kvm/urls";

const KVM = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={[kvmURLs.kvm, kvmURLs.lxd.index, kvmURLs.virsh.index]}>
        <KVMList />
      </Route>
      <Route
        exact
        path={[
          kvmURLs.lxd.cluster.index(null, true),
          kvmURLs.lxd.cluster.edit(null, true),
          kvmURLs.lxd.cluster.host.edit(null, true),
          kvmURLs.lxd.cluster.host.index(null, true),
          kvmURLs.lxd.cluster.hosts(null, true),
          kvmURLs.lxd.cluster.resources(null, true),
          kvmURLs.lxd.cluster.vms.host(null, true),
          kvmURLs.lxd.cluster.vms.index(null, true),
        ]}
      >
        <LXDClusterDetails />
      </Route>
      <Route
        exact
        path={[
          kvmURLs.lxd.single.index(null, true),
          kvmURLs.lxd.single.edit(null, true),
          kvmURLs.lxd.single.resources(null, true),
          kvmURLs.lxd.single.vms(null, true),
        ]}
      >
        <LXDSingleDetails />
      </Route>
      <Route
        exact
        path={[
          kvmURLs.virsh.details.index(null, true),
          kvmURLs.virsh.details.edit(null, true),
          kvmURLs.virsh.details.resources(null, true),
        ]}
      >
        <VirshDetails />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default KVM;
