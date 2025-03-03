import type { ControllerInstallType, ControllerVersionIssues } from "./enum";

import type { APIError } from "app/base/types";
import type { PowerType } from "app/store/general/types";
import type { PowerState, StorageLayout } from "app/store/types/enum";
import type { ModelRef } from "app/store/types/model";
import type {
  NodeActions,
  BaseNode,
  NodeType,
  NodeTypeDisplay,
  NodeLinkType,
  Disk,
  TestStatus,
  NodeEvent,
  GroupedStorage,
  NetworkInterface,
  NodeIpAddress,
  NodeMetadata,
  NodeNumaNode,
  PowerParameters,
  NodeStatus,
  Filesystem,
  SupportedFilesystem,
  NodeVlan,
  WorkloadAnnotations,
  NodeDeviceRef,
} from "app/store/types/node";
import type { GenericState } from "app/store/types/state";
import type { VLAN, VLANMeta } from "app/store/vlan/types";

export type ControllerVersionInfo = {
  snap_revision?: string;
  version: string;
};

export type ControllerVersions = {
  current: ControllerVersionInfo;
  install_type?: ControllerInstallType;
  origin: string;
  snap_cohort?: string;
  up_to_date: boolean;
  update?: ControllerVersionInfo;
  issues: ControllerVersionIssues[];
};

export type ControllerVlansHA = {
  false: number;
  true: number;
};

export type ControllerActions =
  | NodeActions.DELETE
  | NodeActions.IMPORT_IMAGES
  | NodeActions.OFF
  | NodeActions.ON
  | NodeActions.OVERRIDE_FAILED_TESTING
  | NodeActions.SET_ZONE
  | NodeActions.TEST;

export type BaseController = BaseNode & {
  actions: ControllerActions[];
  last_image_sync: string;
  link_type: NodeLinkType.CONTROLLER;
  node_type_display:
    | NodeTypeDisplay.RACK_CONTROLLER
    | NodeTypeDisplay.REGION_CONTROLLER
    | NodeTypeDisplay.REGION_AND_RACK_CONTROLLER;
  node_type:
    | NodeType.RACK_CONTROLLER
    | NodeType.REGION_CONTROLLER
    | NodeType.REGION_AND_RACK_CONTROLLER;
  service_ids: number[];
  versions: ControllerVersions | null;
  vlans_ha?: ControllerVlansHA;
};

export type ControllerDetails = BaseController & {
  bios_boot_method: string;
  bmc: number;
  boot_disk: Disk | null;
  commissioning_start_time: string;
  commissioning_status: TestStatus;
  created: string;
  current_commissioning_script_set: number;
  current_installation_script_set: number;
  current_testing_script_set: number;
  default_user: string;
  detected_storage_layout: StorageLayout;
  devices: NodeDeviceRef[];
  dhcp_on: boolean;
  disks: Disk[];
  dynamic: boolean;
  ephemeral_deploy: boolean;
  error_description: string;
  error: string;
  events: NodeEvent[];
  grouped_storages: GroupedStorage[];
  hardware_uuid: string | null;
  has_logs: boolean;
  hwe_kernel: string | null;
  install_kvm: boolean;
  install_rackd: boolean;
  installation_start_time: string;
  installation_status: number;
  interfaces: NetworkInterface[];
  ip_addresses: NodeIpAddress[];
  last_applied_storage_layout: StorageLayout;
  license_key: string | null;
  metadata: NodeMetadata;
  min_hwe_kernel: string | null;
  numa_nodes: NodeNumaNode[];
  on_network: boolean;
  owner: string;
  physical_disk_count: number;
  power_bmc_node_count: number;
  power_parameters: PowerParameters;
  power_state: PowerState;
  power_type: PowerType["name"];
  previous_status: NodeStatus;
  pxe_mac_vendor?: string;
  pxe_mac?: string;
  register_vmhost: boolean;
  show_os_info: boolean;
  special_filesystems: Filesystem[];
  storage_layout_issues: string[];
  storage_tags: string[];
  storage: number;
  supported_filesystems: SupportedFilesystem[];
  swap_size: number | null;
  testing_start_time: string;
  testing_status: TestStatus;
  updated: string;
  vlan_ids: VLAN[VLANMeta.PK][];
  vlan?: NodeVlan | null;
  workload_annotations: WorkloadAnnotations;
  zone: ModelRef;
};

export type Controller = BaseController | ControllerDetails;

export type ControllerState = GenericState<Controller, APIError>;
