import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFeatureFlags } from '../src/useFeatureFlags';

describe('useFeatureFlags', () => {
  it('should test', async () => {
    const wrapper = (params: any) => (
      <div>
        {params.children}
      </div>
    );
    const { result } = renderHook(() => useFeatureFlags(), { wrapper });
    // await waitForNextUpdate();

    const hasFeatureFlag = result.current;
    expect(hasFeatureFlag).toBe(true);
  });
});