import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from '../user/user.model';
import Token from './token.model';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenModel: typeof Token,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async changePassword(tokenValue: string, newPassword: string): Promise<void> {
    if (!newPassword) throw new BadRequestException('Invalid password');

    const foundToken = await this.tokenModel.findOne({
      where: { value: tokenValue },
    });
    if (!foundToken) throw new BadRequestException('Invalid token');
    if (!foundToken.isValid())
      throw new BadRequestException('Token expired or already used');

    const user = await this.userModel.findOne({where: { username: foundToken.userId }});
    if (!user) throw new BadRequestException('User not found');

    user.set('password',newPassword);
    await user.save();
    await foundToken.useToken();
  }

  async generateToken(userId: string, generatedBy: number): Promise<string> {
    const user = await this.userModel.findOne({ where: { username: userId } });
    if (!user) throw new BadRequestException('User not found');

    const activeTokens = await this.tokenModel.findAll({
      where: { userId, active: true },
    });
    const notExpiredToken = activeTokens.find(
      (t) => t.expirationDate < new Date(),
    );
    if (notExpiredToken)
      throw new ConflictException('An active token already exists');

    console.log('Creating token with payload:', { userId, generatedBy });
    const created = this.tokenModel.build({
      userId,
      generatedBy,
    });
    await created.save();
    return created.value;
  }

  async deleteToken(id: number): Promise<void> {
    const token = await this.tokenModel.findByPk(id);
    if (!token) throw new BadRequestException('Token not found');
    await token.destroy();
  }

  async getByUser(userId: number): Promise<Token[]> {
    return this.tokenModel.findAll({ where: { userId } });
  }

  async disableToken(id: number): Promise<void> {
    const token = await this.tokenModel.findByPk(id);
    if (!token) throw new BadRequestException('Token not found');
    token.active = false;
    await token.save();
  }
}
