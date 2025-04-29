// userService.test.js
import { createUser } from './userService.js';
import userRepository from './userRepository.js';

// Step 1: Automatically mock the entire userRepository module with mock functions
jest.mock('./userRepository.js');

describe('createUser', () => {
  afterEach(() => {
    // Step 2: Reset mock state after each test to avoid cross-test contamination
    jest.clearAllMocks();
  });

  it('should call findByEmail with correct email (SPY)', async () => {
    // Step 3: Stub findByEmail to simulate "user not found"
    userRepository.findByEmail.mockResolvedValue(null); // Stubs a function to return a
    userRepository.save.mockResolvedValue({ id: 1, email: 'test@example.com' });

    await createUser({ email: 'test@example.com' });

    // Step 4: Spy assertions
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should save user if not exists (STUB)', async () => {
    // Step 5: Stub both methods
    userRepository.findByEmail.mockResolvedValue(null);
    const fakeSavedUser = { id: 42, email: 'new@user.com' };
    userRepository.save.mockResolvedValue(fakeSavedUser);

    const result = await createUser({ email: 'new@user.com' });

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith({ email: 'new@user.com' });
    expect(result).toEqual(fakeSavedUser);
  });

  it('should throw error if user already exists', async () => {
    // Step 6: Stub findByEmail to simulate existing user
    userRepository.findByEmail.mockResolvedValue({ id: 99, email: 'existing@user.com' });

    await expect(createUser({ email: 'existing@user.com' }))
      .rejects
      .toThrow('User already exists');

    // Step 7: Ensure save is not called
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
