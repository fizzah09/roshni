const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Upsert user by Google ID
        let user = await prisma.user.upsert({
          where: { googleId: profile.id },
          update: {
            displayName: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value ?? null,
          },
          create: {
            googleId: profile.id,
            email: profile.emails?.[0]?.value ?? '',
            displayName: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value ?? null,
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
