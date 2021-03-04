# react-esquio &middot; [![npm version](https://img.shields.io/npm/v/react-esquio.svg?style=flat)](https://www.npmjs.com/package/react-esquio) [![npm](https://img.shields.io/npm/l/react-esquio?style=flat)](https://github.com/Yello001/react-esquio/blob/master/LICENSE)
Esquio FeatureFlags from React, using hooks.

## Quickstart
```jsx
import {FeatureFlagProvider} from 'react-esquio';

return (
  <FeatureFlagProvider
    value={{
      apiKey: 'apiKey',
      url: 'https://test',
      product: 'product',
      deployment: 'deployment'
    }}>
    ...
  </FeatureFlagProvider>
);
```
```jsx
import {useFeatureFlags} from 'react-esquio';

const [canCreate, canUpdate] = useFeatureFlags('Create', 'Update');
```

## Toggles
Currently only the **Identity Claim Value** Toggle is supported. Token can be provided to FeatureFlagProvider as *toggles*
```jsx
import {claimValueToggle} from 'react-esquio';

<FeatureFlagProvider
  value={{
    ...,
    toggles: claimValueToggle(tokenParsed)
  }}>
  ...
</FeatureFlagProvider>
```