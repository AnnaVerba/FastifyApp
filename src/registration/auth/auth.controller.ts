import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../model/dto/User.dto';
import { LoginUserDto } from '../model/dto/LoginUser';
import { FastifyReply } from 'fastify';
import { TokenInterceptor } from '../../interseptors/token.interceptor';
import { CookieTokenInterceptor } from '../../interseptors/cookie-token.interceptor';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ description: 'registration' })
  @ApiOkResponse({ type: UserDto, description: 'Successfully created user' })
  @ApiBadRequestResponse({ description: 'Incorrect registration data.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async register(@Body() LoginDto: LoginUserDto): Promise<UserDto> {
    return this.authService.registration(LoginDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Login' })
  @UseInterceptors(TokenInterceptor)
  async login(@Body() loginDto: LoginUserDto): Promise<UserDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseInterceptors(CookieTokenInterceptor)
  @ApiOperation({ description: 'Refresh' })
  async refresh(
    @Req() request,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<UserDto> {
    return this.authService.regenerateTokens(request);
  }

  @Get('confirm/:email')
  async confirm(@Param() query) {
    console.log(query.email, 'controller');
    return this.authService.confirm(query.email);
  }


}
