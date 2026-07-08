import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser, RegisterUserPayload } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config/index";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

//   const accessToken = jwt.sign({ jwtPayload }, config.jwt_access_secret, {
//     expiresIn: config.jwt_access_expires_in,
//   } as SignOptions);

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  )

//   const refreshToken = jwt.sign({ jwtPayload }, config.jwt_refresh_secret, {
//     expiresIn: config.jwt_refresh_expires_in,
//   } as SignOptions);
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  )

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const createUserIntoDB = async(payload : RegisterUserPayload) =>{
    const {name,email,password,role,phone,address,image} = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })
    if(isUserExist){
        throw new Error("User email already exist")
    }

    const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            address,
            profile : {
                create :{
                    image
                }
            }
        }
    })
    // await prisma.profile.create({
    //     data : {
    //         userId : createdUser.id,
    //         profilePhoto
    //     }
    // })

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id
        },
        omit:{
            password : true
        },
        include : {
            profile : true
        }
    })
    return user;
}

const getMyProfileFromDB = async(userId : string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where : {id : userId},
        omit: {
            password :true
        },
        include : {
            profile: true
        }
    })
    return user
}

export const authService = {
  createUserIntoDB,
  loginUser,
  getMyProfileFromDB
};
