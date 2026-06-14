import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';

describe('UsersService account access', () => {
  const repository = {
    findUserByUuid: jest.fn(),
    countAvailableUsersByRole: jest.fn(),
    saveUser: jest.fn(),
    removeUser: jest.fn(),
  } as unknown as jest.Mocked<UsersRepository>;
  const service = new UsersService(repository);

  const createUser = (overrides: Partial<UserEntity> = {}): UserEntity =>
    ({
      uuid: 'user-uuid',
      email: 'user@example.com',
      username: 'user',
      passwordHash: 'hash',
      isActive: true,
      blockedUntil: null,
      blockedReason: null,
      role: {
        code: 'USER',
        label: 'User',
        permissions: [],
      },
      ...overrides,
    }) as UserEntity;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('denies access while a temporary block is active', () => {
    const user = createUser({
      blockedUntil: new Date(Date.now() + 60_000),
    });

    expect(service.isUserAccessAllowed(user)).toBe(false);
  });

  it('allows access after a temporary block expires', () => {
    const user = createUser({
      blockedUntil: new Date(Date.now() - 60_000),
    });

    expect(service.isUserAccessAllowed(user)).toBe(true);
  });

  it('rejects a block expiration in the past', async () => {
    repository.findUserByUuid.mockResolvedValue(createUser());

    await expect(
      service.blockUser(
        'user-uuid',
        new Date(Date.now() - 60_000).toISOString(),
        'Expired block',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('does not delete the last available administrator', async () => {
    repository.findUserByUuid.mockResolvedValue(
      createUser({
        role: {
          code: 'ADMIN',
          label: 'Administrator',
          permissions: [],
        },
      }),
    );
    repository.countAvailableUsersByRole.mockResolvedValue(1);

    await expect(service.deleteUser('user-uuid')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(repository.removeUser).not.toHaveBeenCalled();
  });
});
