import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'flaux-co',
  location: 'us-central1'
};

export const listTeamMembersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeamMembers');
}
listTeamMembersRef.operationName = 'ListTeamMembers';

export function listTeamMembers(dc) {
  return executeQuery(listTeamMembersRef(dc));
}

export const getAgencyInfoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgencyInfo');
}
getAgencyInfoRef.operationName = 'GetAgencyInfo';

export function getAgencyInfo(dc) {
  return executeQuery(getAgencyInfoRef(dc));
}

export const listServicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListServices');
}
listServicesRef.operationName = 'ListServices';

export function listServices(dc) {
  return executeQuery(listServicesRef(dc));
}

export const listTestimonialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTestimonials');
}
listTestimonialsRef.operationName = 'ListTestimonials';

export function listTestimonials(dc) {
  return executeQuery(listTestimonialsRef(dc));
}

