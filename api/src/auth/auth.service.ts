import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthToken } from './dto/auth-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateJwt(
    id: string,
    email: string,
    accessToken: string,
  ): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) throw new UnauthorizedException('Invalid Token');

    if (!(user._id.toString() === id) || !(user.accessToken === accessToken))
      throw new UnauthorizedException('Invalid Token');

    return user;
  }

  async login(user: UserDocument): Promise<AuthToken> {
    const payload = {
      email: user.email,
      sub: user._id,
      accessToken: user.accessToken,
    };
    return {
      access_token: this.genToken(payload),
    };
  }

  genToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    });
  }

  async googleLogin(
    profile: any,
    accessToken: string,
    refreshToken: string,
  ): Promise<UserDocument> {
    let user = await this.usersService.findOne(profile.emails[0].value);

    if (!user) user = await this.usersService.create(profile);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    return user;
  }
}
