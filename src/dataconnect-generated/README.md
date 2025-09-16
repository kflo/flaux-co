# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListTeamMembers*](#listteammembers)
  - [*GetAgencyInfo*](#getagencyinfo)
  - [*ListServices*](#listservices)
  - [*ListTestimonials*](#listtestimonials)
- [**Mutations**](#mutations)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListTeamMembers
You can execute the `ListTeamMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTeamMembers(): QueryPromise<ListTeamMembersData, undefined>;

interface ListTeamMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTeamMembersData, undefined>;
}
export const listTeamMembersRef: ListTeamMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTeamMembers(dc: DataConnect): QueryPromise<ListTeamMembersData, undefined>;

interface ListTeamMembersRef {
  ...
  (dc: DataConnect): QueryRef<ListTeamMembersData, undefined>;
}
export const listTeamMembersRef: ListTeamMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTeamMembersRef:
```typescript
const name = listTeamMembersRef.operationName;
console.log(name);
```

### Variables
The `ListTeamMembers` query has no variables.
### Return Type
Recall that executing the `ListTeamMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTeamMembersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTeamMembersData {
  teamMembers: ({
    id: UUIDString;
    name: string;
    role: string;
    photoUrl?: string | null;
  } & TeamMember_Key)[];
}
```
### Using `ListTeamMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTeamMembers } from '@dataconnect/generated';


// Call the `listTeamMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTeamMembers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTeamMembers(dataConnect);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
listTeamMembers().then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

### Using `ListTeamMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTeamMembersRef } from '@dataconnect/generated';


// Call the `listTeamMembersRef()` function to get a reference to the query.
const ref = listTeamMembersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTeamMembersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.teamMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.teamMembers);
});
```

## GetAgencyInfo
You can execute the `GetAgencyInfo` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAgencyInfo(): QueryPromise<GetAgencyInfoData, undefined>;

interface GetAgencyInfoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAgencyInfoData, undefined>;
}
export const getAgencyInfoRef: GetAgencyInfoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAgencyInfo(dc: DataConnect): QueryPromise<GetAgencyInfoData, undefined>;

interface GetAgencyInfoRef {
  ...
  (dc: DataConnect): QueryRef<GetAgencyInfoData, undefined>;
}
export const getAgencyInfoRef: GetAgencyInfoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAgencyInfoRef:
```typescript
const name = getAgencyInfoRef.operationName;
console.log(name);
```

### Variables
The `GetAgencyInfo` query has no variables.
### Return Type
Recall that executing the `GetAgencyInfo` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAgencyInfoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAgencyInfo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAgencyInfo } from '@dataconnect/generated';


// Call the `getAgencyInfo()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAgencyInfo();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAgencyInfo(dataConnect);

console.log(data.agencyInfos);

// Or, you can use the `Promise` API.
getAgencyInfo().then((response) => {
  const data = response.data;
  console.log(data.agencyInfos);
});
```

### Using `GetAgencyInfo`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAgencyInfoRef } from '@dataconnect/generated';


// Call the `getAgencyInfoRef()` function to get a reference to the query.
const ref = getAgencyInfoRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAgencyInfoRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agencyInfos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agencyInfos);
});
```

## ListServices
You can execute the `ListServices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listServices(): QueryPromise<ListServicesData, undefined>;

interface ListServicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListServicesData, undefined>;
}
export const listServicesRef: ListServicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listServices(dc: DataConnect): QueryPromise<ListServicesData, undefined>;

interface ListServicesRef {
  ...
  (dc: DataConnect): QueryRef<ListServicesData, undefined>;
}
export const listServicesRef: ListServicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listServicesRef:
```typescript
const name = listServicesRef.operationName;
console.log(name);
```

### Variables
The `ListServices` query has no variables.
### Return Type
Recall that executing the `ListServices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListServicesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListServices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listServices } from '@dataconnect/generated';


// Call the `listServices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listServices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listServices(dataConnect);

console.log(data.services);

// Or, you can use the `Promise` API.
listServices().then((response) => {
  const data = response.data;
  console.log(data.services);
});
```

### Using `ListServices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listServicesRef } from '@dataconnect/generated';


// Call the `listServicesRef()` function to get a reference to the query.
const ref = listServicesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listServicesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.services);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.services);
});
```

## ListTestimonials
You can execute the `ListTestimonials` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTestimonials(): QueryPromise<ListTestimonialsData, undefined>;

interface ListTestimonialsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTestimonialsData, undefined>;
}
export const listTestimonialsRef: ListTestimonialsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTestimonials(dc: DataConnect): QueryPromise<ListTestimonialsData, undefined>;

interface ListTestimonialsRef {
  ...
  (dc: DataConnect): QueryRef<ListTestimonialsData, undefined>;
}
export const listTestimonialsRef: ListTestimonialsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTestimonialsRef:
```typescript
const name = listTestimonialsRef.operationName;
console.log(name);
```

### Variables
The `ListTestimonials` query has no variables.
### Return Type
Recall that executing the `ListTestimonials` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTestimonialsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTestimonials`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTestimonials } from '@dataconnect/generated';


// Call the `listTestimonials()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTestimonials();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTestimonials(dataConnect);

console.log(data.testimonials);

// Or, you can use the `Promise` API.
listTestimonials().then((response) => {
  const data = response.data;
  console.log(data.testimonials);
});
```

### Using `ListTestimonials`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTestimonialsRef } from '@dataconnect/generated';


// Call the `listTestimonialsRef()` function to get a reference to the query.
const ref = listTestimonialsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTestimonialsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.testimonials);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.testimonials);
});
```

# Mutations

No mutations were generated for the `example` connector.

If you want to learn more about how to use mutations in Data Connect, you can follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

