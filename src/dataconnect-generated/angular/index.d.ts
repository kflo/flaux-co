import { ListTeamMembersData, GetAgencyInfoData, ListServicesData, ListTestimonialsData } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise} from '@angular/fire/data-connect';
import { CreateQueryResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

export type ListTeamMembersOptions = () => Omit<CreateDataConnectQueryOptions<ListTeamMembersData, undefined>, 'queryFn'>;
export function injectListTeamMembers(options?: ListTeamMembersOptions, injector?: Injector): CreateDataConnectQueryResult<ListTeamMembersData, undefined>;

export type GetAgencyInfoOptions = () => Omit<CreateDataConnectQueryOptions<GetAgencyInfoData, undefined>, 'queryFn'>;
export function injectGetAgencyInfo(options?: GetAgencyInfoOptions, injector?: Injector): CreateDataConnectQueryResult<GetAgencyInfoData, undefined>;

export type ListServicesOptions = () => Omit<CreateDataConnectQueryOptions<ListServicesData, undefined>, 'queryFn'>;
export function injectListServices(options?: ListServicesOptions, injector?: Injector): CreateDataConnectQueryResult<ListServicesData, undefined>;

export type ListTestimonialsOptions = () => Omit<CreateDataConnectQueryOptions<ListTestimonialsData, undefined>, 'queryFn'>;
export function injectListTestimonials(options?: ListTestimonialsOptions, injector?: Injector): CreateDataConnectQueryResult<ListTestimonialsData, undefined>;
