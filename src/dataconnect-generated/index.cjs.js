const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'flaux-co',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const listTeamMembersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTeamMembers');
}
listTeamMembersRef.operationName = 'ListTeamMembers';
exports.listTeamMembersRef = listTeamMembersRef;

exports.listTeamMembers = function listTeamMembers(dc) {
  return executeQuery(listTeamMembersRef(dc));
};

const getAgencyInfoRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgencyInfo');
}
getAgencyInfoRef.operationName = 'GetAgencyInfo';
exports.getAgencyInfoRef = getAgencyInfoRef;

exports.getAgencyInfo = function getAgencyInfo(dc) {
  return executeQuery(getAgencyInfoRef(dc));
};

const listServicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListServices');
}
listServicesRef.operationName = 'ListServices';
exports.listServicesRef = listServicesRef;

exports.listServices = function listServices(dc) {
  return executeQuery(listServicesRef(dc));
};

const listTestimonialsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTestimonials');
}
listTestimonialsRef.operationName = 'ListTestimonials';
exports.listTestimonialsRef = listTestimonialsRef;

exports.listTestimonials = function listTestimonials(dc) {
  return executeQuery(listTestimonialsRef(dc));
};
