import { renderHook } from '@testing-library/react-hooks';
import { useNavigation } from './useNavigation';

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}));

describe('useNavigation', () => {
  it('should go to signin page', () => {
    const { result } = renderHook(() => useNavigation());
    result.current.toSignin();
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });
  it('should  go to signup page', () => {
    const { result } = renderHook(() => useNavigation());
    result.current.toSignup();
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
  it('should  go to dashboard page', () => {
    const { result } = renderHook(() => useNavigation());
    result.current.toDashboard();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
  it('should  go to home page', () => {
    const { result } = renderHook(() => useNavigation());
    result.current.toHome();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
