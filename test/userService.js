import userRepository from './userRepository.js';

export async function createUser(userData) {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  return userRepository.save(userData);
}
