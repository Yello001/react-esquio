import { FeatureService, FeatureToggle, RestRequest } from 'esquio-js-connector';
import React from 'react';

export interface FeatureFlagConfig {
  url: string;
  apiKey: string;
  product: string;
  deployment?: string
  toggles?: { [key: string]: FeatureToggle }
}

const FeatureFlagConfigContext = React.createContext<FeatureFlagConfig | undefined>(undefined);
export const FeatureFlagProvider = FeatureFlagConfigContext.Provider;

export function useFeatureFlags(...names: string[]): boolean[] {
  const [result, setResult] = React.useState<boolean[]>(names.map(() => false));

  const configContext = React.useContext(FeatureFlagConfigContext)
  if (!configContext) {
    throw Error('no FeatureFlagConfigContext found');
  }

  React.useEffect(() => {
    const { toggles, ...requestConfig } = configContext;
    const service = new FeatureService(new RestRequest(requestConfig), toggles);
    Promise.all(names.map(name => service.isFeatureEnabled(name)))
      .then(value => {
        setResult(value);
      })
      .catch(reason => console.error(reason));
  }, [setResult, configContext, ...names])

  return result;
}