import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { KnexModule } from 'nest-knexjs';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        KnexModule.forRoot({
          config: {
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: ':memory:',
          },
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO
  // it('shoud have password requirements', () => {});
});
