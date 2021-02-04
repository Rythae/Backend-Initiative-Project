const dotenv = require("dotenv");
const util = require("../utility/util");
const Model = require("../database/models");

dotenv.config();

const { User } = Model;

const controller = async (req, res) => {
  const { user } = req;
  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: `${user.oauthId}@gmail.com`,
    password: user.oauthId,
    avatarUrl: user.profileImage,
    isVerified: true,
  };

  try {
    let dbUser = await User.findOne({
      where: { password: user.oauthId },
    });

    if (!dbUser) {
      dbUser = await User.create(userData);
    }

    const payload = {
      id: dbUser.id,
      email: "",
      token: util.setToken({ id: dbUser.id }),
      bio: dbUser.bio,
      image: dbUser.avatar,
      isVerified: dbUser.isVerified,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      avatarUrl: dbUser.avatarUrl,
    };
    const token = util.setToken(payload);

    return res.redirect(
      `${process.env.FRONTEND_OAUTH_CALLBACK}?token=${token}`
    );
  } catch (e) {
    return res.redirect(`${process.env.FRONTEND_OAUTH_CALLBACK}`);
  }
};
module.exports = controller;
