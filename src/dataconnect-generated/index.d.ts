import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AgencyInfo_Key {
  id: UUIDString;
  __typename?: 'AgencyInfo_Key';
}

export interface GetAgencyInfoData {
  agencyInfos: ({
    name: string;
    description: string;
    tagline: string;
    address?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
    foundingYear?: number | null;
    missionStatement?: string | null;
  })[];
}

export interface ListServicesData {
  services: ({
    id: UUIDString;
    title: string;
    description: string;
    detailedDescription?: string | null;
    features?: string[] | null;
    iconUrl?: string | null;
  } & Service_Key)[];
}

export interface ListTeamMembersData {
  teamMembers: ({
    id: UUIDString;
    name: string;
    role: string;
    photoUrl?: string | null;
  } & TeamMember_Key)[];
}

export interface ListTestimonialsData {
  testimonials: ({
    id: UUIDString;
    clientName: string;
    clientTitle?: string | null;
    clientCompany?: string | null;
    clientLogoUrl?: string | null;
    quote: string;
  } & Testimonial_Key)[];
}

export interface PageSection_Key {
  id: UUIDString;
  __typename?: 'PageSection_Key';
}

export interface Service_Key {
  id: UUIDString;
  __typename?: 'Service_Key';
}

export interface TeamMember_Key {
  id: UUIDString;
  __typename?: 'TeamMember_Key';
}

export interface Testimonial_Key {
  id: UUIDString;
  __typename?: 'Testimonial_Key';
}

export interface VideoAsset_Key {
  id: UUIDString;
  __typename?: 'VideoAsset_Key';
}

interface ListTeamMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTeamMembersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTeamMembersData, undefined>;
  operationName: string;
}
export const listTeamMembersRef: ListTeamMembersRef;

export function listTeamMembers(): QueryPromise<ListTeamMembersData, undefined>;
export function listTeamMembers(dc: DataConnect): QueryPromise<ListTeamMembersData, undefined>;

interface GetAgencyInfoRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgencyInfoData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAgencyInfoData, undefined>;
  operationName: string;
}
export const getAgencyInfoRef: GetAgencyInfoRef;

export function getAgencyInfo(): QueryPromise<GetAgencyInfoData, undefined>;
export function getAgencyInfo(dc: DataConnect): QueryPromise<GetAgencyInfoData, undefined>;

interface ListServicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListServicesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListServicesData, undefined>;
  operationName: string;
}
export const listServicesRef: ListServicesRef;

export function listServices(): QueryPromise<ListServicesData, undefined>;
export function listServices(dc: DataConnect): QueryPromise<ListServicesData, undefined>;

interface ListTestimonialsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTestimonialsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTestimonialsData, undefined>;
  operationName: string;
}
export const listTestimonialsRef: ListTestimonialsRef;

export function listTestimonials(): QueryPromise<ListTestimonialsData, undefined>;
export function listTestimonials(dc: DataConnect): QueryPromise<ListTestimonialsData, undefined>;

