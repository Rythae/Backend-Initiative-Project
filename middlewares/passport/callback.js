const callback = (accessToken, refreshToken, profile, done) => {
  const { id, provider } = profile;
  const { picture } = profile._json;
  const user = { oauthId: id, type: provider };

  if (provider === "google") {
    const {
      family_name: lastName,
      given_name: firstName,
      email,
    } = profile._json;
    user.lastName = lastName;
    user.firstName = firstName;
    user.email = email;
     console.log("userl", user);
      console.log("github email", firstName);
      console.log("github email", lastName);

    if (picture && picture.trim() !== "") {
      user.profileImage = picture.trim();
    }
  } else if (provider === "github") {
    const { email: email } = profile._json;
      user.email = email;
    console.log("userl", profile);
    console.log('github email', email);
    const photo = picture && picture.data && picture.data.url;

    if (photo && photo.trim() !== "") {
      user.profileImage = photo.trim();
    }
  }
  return done(null, user);
};

module.exports = callback;
