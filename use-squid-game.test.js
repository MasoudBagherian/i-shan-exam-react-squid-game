import { renderHook } from '@testing-library/react-hooks/dom/pure';

import useSquidGame from './use-squid-game';
import sampleValidate from './sample-validation';

describe('useSquidGame hook test', () => {
  test('hook shape must match with the question', () => {
    const { result } = renderHook(props => useSquidGame(props.sampleValidate), {
      initialProps: { sampleValidate },
    });

    expect(result.current.register).toBeDefined();
    expect(result.current.register('number').ref).toBeDefined();
    expect(result.current.register('number').type).toBeDefined();
    expect(result.current.register('number').onChange).toBeDefined();
    expect(result.current.register('number').disabled).toBeDefined();

    expect(result.current.register('checkbox').ref).toBeDefined();
    expect(result.current.register('checkbox').type).toBeDefined();
    expect(result.current.register('checkbox').onChange).toBeDefined();
    expect(result.current.register('checkbox').disabled).toBeDefined();

    expect(result.current.submit.onClick).toBeDefined();
    expect(result.current.submit.disabled).toBeDefined();

    expect(result.current.isLoading).toBeDefined();
    expect(result.current.gameStatus).toBeDefined();
    expect(result.current.history).toBeDefined();
  });
});
