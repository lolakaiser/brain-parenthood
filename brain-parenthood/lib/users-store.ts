// Use global to share state across Next.js route modules
declare global {
  var usersStore: Map<string, { id: number; email: string; password: string; name: string; isAdmin: boolean }> | undefined;
  var nextUserId: number | undefined;
}

if (!global.usersStore) {
  global.usersStore = new Map();
  global.usersStore.set('test@test.com', { id: 1, email: 'test@test.com', password: 'test', name: 'Test User', isAdmin: false });
  global.usersStore.set('admin@sensym.com', { id: 2, email: 'admin@sensym.com', password: 'admin123', name: 'Admin', isAdmin: true });
}
if (!global.nextUserId) {
  global.nextUserId = 3;
}

export function getUser(email: string) {
  return global.usersStore!.get(email);
}

export function hasUser(email: string) {
  return global.usersStore!.has(email);
}

export function createUser(email: string, password: string, name: string) {
  const newUser = { id: global.nextUserId!++, email, password, name, isAdmin: false };
  global.usersStore!.set(email, newUser);
  return newUser;
}
