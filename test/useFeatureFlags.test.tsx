import { renderHook } from '@testing-library/react-hooks';
import { WrapperComponent } from '@testing-library/react-hooks/src/types/react';
import { FeatureService, FeatureToggle, RestRequest } from 'esquio-js-connector';
import React from 'react';
import { FeatureFlagProvider, useFeatureFlags } from '../src';

// noinspection JSUnusedLocalSymbols
const isFeatureEnabledMock = jest.fn((name: string) => Promise.resolve(true));

jest.mock('esquio-js-connector', () => ({
  FeatureService: jest.fn().mockImplementation(() => ({
    isFeatureEnabled: isFeatureEnabledMock
  })),
  RestRequest: jest.fn().mockImplementation(),
}));

describe('useFeatureFlags', () => {
  it.each([true, false])('should return %s', async (expectedResult) => {
      // noinspection JSUnusedLocalSymbols
    isFeatureEnabledMock.mockImplementationOnce((name: string) => Promise.resolve(expectedResult));

      const requestConfig = { apiKey: 'apiKey', url: 'http://test.org', product: 'product', deployment: 'deployment' };
      const toggles: { [key: string]: FeatureToggle } = { 'testToggle': () => true };
      const wrapper: WrapperComponent<React.PropsWithChildren<{}>> = ({ children }) => {
        return (
          <FeatureFlagProvider value={{ ...requestConfig, toggles }}>
            {children}
          </FeatureFlagProvider>
        );
      };

      const { result, waitForNextUpdate } = renderHook(() => useFeatureFlags('testFlag'), { wrapper });
      await waitForNextUpdate();

      expect(result.current).toStrictEqual([expectedResult]);
      expect(RestRequest).toBeCalledWith(requestConfig);
      expect(FeatureService).toBeCalledWith({}, toggles);
    }
  );
});