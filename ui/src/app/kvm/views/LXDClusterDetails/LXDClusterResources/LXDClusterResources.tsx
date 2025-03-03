import { Spinner, Strip } from "@canonical/react-components";
import { useSelector } from "react-redux";

import LXDClusterSummaryCard from "../LXDClusterSummaryCard";

import { useWindowTitle } from "app/base/hooks";
import KVMStorageCards from "app/kvm/components/KVMStorageCards";
import type { RootState } from "app/store/root/types";
import vmClusterSelectors from "app/store/vmcluster/selectors";
import type { VMCluster } from "app/store/vmcluster/types";

type Props = {
  clusterId: VMCluster["id"];
};

const LXDClusterResources = ({ clusterId }: Props): JSX.Element => {
  const cluster = useSelector((state: RootState) =>
    vmClusterSelectors.getById(state, clusterId)
  );
  useWindowTitle(`${cluster?.name || "Cluster"} resources`);

  return (
    <>
      <Strip shallow>
        <LXDClusterSummaryCard clusterId={clusterId} showStorage={false} />
      </Strip>
      <Strip shallow>
        {cluster ? (
          <KVMStorageCards pools={cluster.total_resources.storage_pools} />
        ) : (
          <Spinner text="Loading..." />
        )}
      </Strip>
    </>
  );
};

export default LXDClusterResources;
